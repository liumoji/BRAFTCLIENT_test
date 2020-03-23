'use strict';
const logger = require('./lib/log/logger.js');
const rpcConfig = require('./config/rpc.js');
const RpcClient = require('./lib/rpc/rpc_client.js');
const sleep = require('./lib/grammer/sleep.js');
const health = require('./health/health.js');
logger.info(`battle starting, node version : ${process.version}`);
let health_grade = 0;
const rpcClient = new RpcClient(rpcConfig.raftGroupAddr);
// rpcClient.getRaftLeader().then((ret) => {
//     console.log(ret);
// }).catch((e) => {
//     logger.error(`main::getRaftLeader err:${e}`);
// });
// RpcClient.singleton().getRaftLeader().then((ret) => {
//     console.log(ret);
// }).catch((e) => {
//     logger.error(`main::getRaftLeader err:${e}`);
// });
let initCenterServer = async function(){
    const serverHealth = new health();
    serverHealth.startCollectLoop();
    let id = await rpcClient.register();
    return {id: id};
}

async function heartbeatToCenterServer (id) {
    for (;;) {
        await sleep(10000);
        await rpcClient.heartbeat(id);
    }
} 

initCenterServer().then(ret => {
    heartbeatToCenterServer(ret.id).catch(err => {
        logger.error(`main::heartbeatToCenterServer err:${err}`);
    });
}).catch(err => {
    logger.error(`main::initCenterServer err:${err}`);
});


