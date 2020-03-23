const rCode = {};

rCode.centerServer = {};

rCode.centerServer.OK = 0;                  //成功
rCode.centerServer.ERR_REDIRECT = 1;        //非leader, 需要重定向
rCode.centerServer.ERR_SERIALIZE_REQ = 2;   //序列化request失败
rCode.centerServer.ERR_UPDATE_ALIVE = 3;    //更新存活状态失败

module.exports = rCode;