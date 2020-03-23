const Action = require('../core/Action.js');
const { SUCCESS } = require('../constants.js');
const logger = require('./../../log/logger.js');

/**
 * 通知客户端精灵行动, 只返回SUCCESS
 *
 * @module b3
 * @class SpriteMove
 * @extends Action
 **/
class SpriteMove extends Action {
    /**
     * Creates an instance of Succeeder.
     * @memberof SpriteMove
     */
    constructor() {
        super({ name: 'SpriteMove' });
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `SUCCESS`.
     **/
    tick(tick) {
        // logger.debug('通知精灵行动', this.properties.idx);
        return SUCCESS;
    }
};

module.exports = SpriteMove;
