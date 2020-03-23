const Action = require('../core/Action.js');
const { RUNNING } = require('../constants.js');

/**
 * This action node returns RUNNING always.
 *
 * @module b3
 * @class Runner
 * @extends Action
 **/
class Runner extends Action {
    /**
     * Creates an instance of Runner.
     * @memberof Runner
     */
    constructor() {
        super({ name: 'Runner' });
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `RUNNING`.
     **/
    tick(tick) {
        return RUNNING;
    }
};

module.exports = Runner;
