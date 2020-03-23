const Condition = require('../core/Condition.js');
const { SUCCESS, FAILURE } = require('../constants.js');
const logger = require('./../../log/logger.js');

/**
 * 回合是否可以结束
 *
 * @module b3
 * @class RoundOver
 * @extends Condition
 **/
class RoundOver extends Condition {
    /**
     * Creates an instance of Succeeder.
     * @memberof SpriteMove
     */
    constructor() {
        super({ name: 'RoundOver' });
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} 回合可以结束返回SUCCESS,否则返回FAILURE
     **/
    tick(tick) {
        return FAILURE;
    }
};

module.exports = RoundOver;
