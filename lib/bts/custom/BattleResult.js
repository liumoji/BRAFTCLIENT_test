const Action = require('../core/Action.js');
const { SUCCESS } = require('../constants.js');
const logger = require('./../../log/logger.js');

/**
 * 计算回合结果, 只返回SUCCESS
 *
 * @module b3
 * @class BattleResult
 * @extends Action
 **/
class BattleResult extends Action {
    /**
     * Creates an instance of Succeeder.
     * @memberof BattleResult
     */
    constructor() {
        super({ name: 'BattleResult' });
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `SUCCESS`.
     **/
    tick(tick) {
        logger.debug('结算回合结果');
        return SUCCESS;
    }
};

module.exports = BattleResult;
