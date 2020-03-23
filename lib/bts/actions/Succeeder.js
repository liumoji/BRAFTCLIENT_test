const Action = require('../core/Action.js');
const { SUCCESS } = require('../constants.js');

/**
 * This action node returns `SUCCESS` always.
 *
 * @module b3
 * @class Succeeder
 * @extends Action
 **/
class Succeeder extends Action {
    /**
     * Creates an instance of Succeeder.
     * @memberof Succeeder
     */
    constructor() {
        super({ name: 'Succeeder' });
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `SUCCESS`.
     **/
    tick(tick) {
        return SUCCESS;
    }
};

module.exports = Succeeder;
