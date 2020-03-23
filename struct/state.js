'use strict';
/**
 * 服务器状态, 单例
 */
class State {
    constructor() {
        if (State._instance) {
            return State._instance;
        }
        this._userNum = 0;   //在线用户数
        this._heapUsed = 0;  //占用的堆内存
        this._heapTotal = 0; //分配的堆内存
        this.updateMemoryUsage();
        State._instance = this;
    }
    addUserNum(n) {
        this._userNum += n;
    }
    minusUserNum(n) {
        this._userNum -= n;
    }
    updateMemoryUsage() {
        const memUsage = process.memoryUsage();
        this._heapUsed = memUsage.heapUsed;
        this._heapTotal = memUsage.heapTotal;
    }
    get userNum() {
        return this._userNum;
    }
    get heapUsed() {
        return this._heapUsed;
    }
    get heapTotal() {
        return this._heapTotal;
    }
}

module.exports = State;