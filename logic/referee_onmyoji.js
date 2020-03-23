'use strict';
//阴阳师类型的对战, 内部维护一棵行为树
const Referee = require('./../struct/referee.js');
class RefereeOnmyoji extends Referee {
    constructor() {
        super();
        this._type = "onmyoji";
    }
}

module.exports = RefereeOnmyoji;
