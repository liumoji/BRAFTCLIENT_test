const Action = require('../core/Action.js');
const { FAILURE } = require('../constants');

/**
 * This action node returns `FAILURE` always.
 *
 * @module b3
 * @class Failer
 * @extends Action
 **/
class Failer extends Action {
    /**
     * Creates an instance of Failer.
     * @memberof Failer
     */
    constructor() {
        super({ name: 'Failer' });
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `FAILURE`.
     **/
    tick(tick) {
        return FAILURE;
    }
};

module.exports = Failer;