'use strict';
class Skill {
    constructor(skillId) {
        this._skillId = skillId;
        this._pp = 0;
    }
    hasEnoughPP() {
        return this._pp > 0;
    }
    useSkill() {
        if (this.hasEnoughPP()) {
            this._pp -= 1;
            return true;
        }
        return false;
    }
}

module.exports = Skill;