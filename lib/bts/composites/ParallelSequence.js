const Composite = require('../core/Composite.js');
const { SUCCESS, FAILURE } = require('../constants.js');

/**
 * The ParallelSequence node ticks its children parallelly until one of them
 * returns `FAILURE`. If all children return the
 * success state, the sequence also returns `SUCCESS`.
 *
 * @module b3
 * @class ParallelSequence
 * @extends Composite
 **/
class ParallelSequence extends Composite {
    /**
     * Creates an instance of ParallelSequence.
     * @param {Object} params 
     * @param {Array} params.children 
     * @memberof ParallelSequence
     */
    constructor({ children = [] } = {}) {
        super({
            name: 'ParallelSequence',
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

            if (status === FAILURE) {
                return FAILURE;
            }
        }

        return SUCCESS;
    }
};

module.exports = ParallelSequence;
