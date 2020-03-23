'use strict';
const util = require('util');
const grpcLibrary = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const loadOptions = require('./options');
const battleSvrDef = protoLoader.loadSync('../../proto/server/battle.proto',
    loadOptions);
const battleSvrProto = grpcLibrary.loadPackageDefinition(battleSvrDef);
const dealServerReq = require('../../deal_managers/deal_serverReq.js')
const logger = require('./../log/logger.js');

class RpcServer {
    constructor(bindIp, bindPort) {
        if (RpcServer._instance) {
            return RpcServer._instance;
        }
        if (typeof bindIp !== 'string' || typeof bindPort !== 'number') {
            throw new Error(`RpcServer::constructor param err`);
        }
        this._addr = `${bindIp}:${bindPort}`;
        RpcServer._instance = this;
        this._server = new grpcLibrary.Server();
        this.initService();
        let ret = this._server.bind(this._addr,
            grpcLibrary.ServerCredentials.createInsecure());
        if (ret == 0) {
            throw new Error(`RpcServer can't bind ${this._addr}`);
        }
        this._server.start();
        logger.debug(`server running on : ${this._addr}`);
    }

    /**
     * 获取单例
     * @param {string} bindIp server绑定的ip
     * @param {number} bindPort server绑定的端口号
     */
    static singleton(bindIp, bindPort) {
        if (!this._instance) {
            this._instance = new RpcServer(bindIp, bindPort);
        }
        return this._instance;
    }

    initService() {
        let service = {};
        for (let funcName in battleSvrDef["battle.BattleService"]) {
            if (util.types.isAsyncFunction(dealServerReq[funcName])) {
                service[funcName] = util.callbackify(dealServerReq[funcName]);
            } else if (typeof dealServerReq[funcName] === 'function') {
                service[funcName] = dealServerReq[funcName];
            } else {
                logger.warn(`RpcServer service:${funcName} without impl`);
            }
        }
        this._server.addService(battleSvrProto.battle.BattleService.service,
            service);
    }
}

module.exports = RpcServer;
