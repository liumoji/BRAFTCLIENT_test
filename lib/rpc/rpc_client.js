'use strict';
const grpcLibrary = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const loadOptions = require('./options.js');
const rCode = require('../../consts/return_code.js');
const health = require('../../health/health.js');
const cb2promise = require('../grammer/cb2promise.js');
const {RaftGroupAddr} = require('./../../struct/raft.js');
const sleep = require('../grammer/sleep.js');
const logger = require('./../log/logger.js');
const braftCliDef = protoLoader.loadSync('./proto/raft/raftcli.proto',
    loadOptions);
const braftCliProto = grpcLibrary.loadPackageDefinition(braftCliDef);
const reportCliDef = protoLoader.loadSync('./proto/center_svr/report.proto',
    loadOptions);
const reportCliProto = grpcLibrary.loadPackageDefinition(reportCliDef);

class RpcClient {
    /**
     * @param {RaftGroupAddr} raftGroupAddr raft组地址集合
     */
    constructor(raftGroupAddr) {
        if (RpcClient._instance) {
            return RpcClient._instance;
        }
        if (!(raftGroupAddr instanceof RaftGroupAddr)) {
            throw new Error(`RpcClient::constructor param err`);
        }
        this._raftGroupAddr = raftGroupAddr;
        this._reportCli = null;
        this._uuid = "";
        this._type = 1; //battle的服务器类型为 1
        this._health = new health();
        RpcClient._instance = this;
    }
    /**
     * 中心服务器分配的uuid
     */
    get uuid() {
        return this._uuid;
    }
    /**
     * 获取单例
     * @param {RaftGroupAddr} raftGroupAddr raft组地址集合
     */
    static singleton(raftGroupAddr) {
        if (!this._instance) {
            this._instance = new RpcClient(raftGroupAddr);
        }
        return this._instance;
    }
    /**
     * 初始化rpc连接
     */
    async init() {
        const leaderAddr = await this.getRaftLeader();
        console.log(leaderAddr)
        this._reportCli = new reportCliProto.report.reportService(
            leaderAddr,
            grpcLibrary.credentials.createInsecure()
        )
    }
    /**
     * 重定向到raft leader, 并建立rpc
     * @param {string} leaderAddr raft群组leader的地址,形如"8.8.8.8:3000"
     *                            允许为空, 为空则自动寻找leader
     */
    async redirect(leaderAddr) {
        if (!leaderAddr) {
            leaderAddr = await this.getRaftLeader();
        }
        this._reportCli = new reportCliProto.report.reportService(
            leaderAddr,
            grpcLibrary.credentials.createInsecure()
        )
    }
    /**
     * 获取raftLeader的地址
     * @param {string} return raft群组leader的地址,形如"8.8.8.8:3000"
     */
    async getRaftLeader() {
        const attr = this._raftGroupAddr.getNextAddr();
        const braftCli = new braftCliProto.braft.CliService(attr,
            grpcLibrary.credentials.createInsecure());
        try {
            braftCli.get_leader.__param_len = 2;
            const ret = await cb2promise(braftCli.get_leader, braftCli)({
                group_id: 'center_svr'
            });
            console.log(attr)
            logger.info(`RpcClient::getRaftLeader ret:${JSON.stringify(ret)}`);
            return ret.leader_id.substring(0, ret.leader_id.lastIndexOf(":"));
        } catch (e) {
            logger.error(`RpcClient::getRaftLeader err:${e}`);
            await sleep(500);
            return await this.getRaftLeader(this._raftGroupAddr);
        }
    }

    /**
     * 将本服务注册到center server
     */
    async register() {
        if (!this._reportCli) {
            await this.init();
        }
        this._reportCli.rigister.__param_len = 2;
        try {
            const ret = await cb2promise(this._reportCli.rigister,
                this._reportCli)({
                    type: this._type,
                    health_grade: this._health.getHealthGrade()
                });
            if (ret.ret === 0) {
                this._uuid = ret.id;
                logger.debug(`register sucess ret = ${JSON.stringify(ret)}`);
                return ret.id;
            } else {
                if (ret.redirect) {
                    await this.redirect(ret.redirect.substring(0,
                        ret.redirect.lastIndexOf(":")));
                    return await this.register();
                } else {
                    await sleep(1000);
                    return await this.register();
                }
            }
        } catch (e) {
            logger.error(`RpcClient::register err:${e}`);
            await sleep(1000);
            await this.redirect();
            return await this.register();
        }
    }

    async heartbeat(serverId) {
        if (!this._reportCli) {
            serverId = await this.register();
        }

        let healthGrade = this._health.getHealthGrade();

        this._reportCli.heartbeat.__param_len = 2;
        try {
            const ret = await cb2promise(this._reportCli.heartbeat,
                this._reportCli)({ id: serverId, health_grade: healthGrade });
            if (ret.ret === rCode.centerServer.OK) {
                logger.debug(`heartbeat sucess ret = ${JSON.stringify(ret)}`);
                return null;
            } else if (ret.ret == rCode.centerServer.ERR_REDIRECT) {
                if (ret.redirect) {
                    await this.redirect(ret.redirect.substring(0,
                        ret.redirect.lastIndexOf(":")));
                    return await this.heartbeat(serverId, healthGrade);
                }
            }  else {
                await sleep(1000);
                return await this.register();
            }
        } catch (e) {
            logger.error(`RpcClient::heartbeat catch err:${e}`);
            await sleep(1000);
            await this.redirect();
            return await this.register();
        }
    }
}

module.exports = RpcClient;