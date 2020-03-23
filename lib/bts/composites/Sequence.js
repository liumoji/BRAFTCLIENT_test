const Composite = require('../core/Composite.js');
const { SUCCESS } = require('../constants.js');

/**
 * The Sequence node ticks its children sequentially until one of them
 * returns `FAILURE`, `RUNNING` or `ERROR`. If all children return the
 * success state, the sequence also returns `SUCCESS`.
 *
 * @module b3
 * @class Sequence
 * @extends Composite
 **/
class Sequence extends Composite {
    /**
     * Creates an instance of Sequence.
     * @param {Object} params 
     * @param {Array} params.children 
     * @memberof Sequence
     */
    constructor({ children = [] } = {}) {
        super({
            name: 'Sequence',
            children
        });
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick) {
        for (let i = 0; i < this.children.length; i++) {
            const status = this.children[i]._execute(tick);

            if (status !== SUCCESS) {
                return status;
            }
        }

        return SUCCESS;
    }
};

module.exports = Sequence;
