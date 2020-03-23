'use strict';
//特效基类
class Effect {
    /**
     * 
     * @param {number} actionStage 特效生效阶段
     * @param {number} remainingRounds 特效剩余回合数
     * @param {number} checkTarget 触发时需要检测的目标
     * @param {number} target 生效时作用的目标
     */
    constructor(actionStage, remainingRounds, checkTarget, target) {
        this._actionStage = actionStage;
        this._remainingRounds = remainingRounds;
        this._checkTarget = checkTarget;
        this._target = target;
    }
    check(factor) {

    }
    isAlive(factor) {

    }
    act(factor) {

    }
}

module.exports = Effect;
