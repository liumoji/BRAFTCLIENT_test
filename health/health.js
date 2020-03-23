'use strict';

const State = require('./../struct/state.js');
const sleep = require('./../lib/grammer/sleep.js');

class Health {
    constructor() {
        if (Health._instance) {
            return Health._instance;
        }
        this._collecting = false; //是否定时采集信息
        this._collectGap = 500;   //采集周期(毫秒)
        this._state = new State();
        Health._instance = this;
    }
    /**
     * 开启循环采集信息
     */
    async startCollectLoop() {
        this._collecting = true;
        while (this._collecting === true) {
            this._state.updateMemoryUsage();
            await sleep(this._collectGap)
        }
    }

    /**
     * 停止采集
     */
    stopCollectLoop() {
        this._collecting = false;
    }

    /**
     * 获取服务器状态评估积分
     */
    getHealthGrade() {
        const bHealthMemory = 209715200;
        
        let memUsed = this._state.heapUsed;
        //todo 后续添加服务器人数等因素
        return parseInt(memUsed / bHealthMemory);
    }
}

module.exports = Health;
