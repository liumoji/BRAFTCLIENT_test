'use strict';
//宝可梦类型的对战, 内部维护一棵行为树
const Referee = require('./../struct/referee.js');
class RefereePokemon extends Referee {
    constructor() {
        super();
        this._type = "pokemon";
    }
}

module.exports = RefereePokemon;