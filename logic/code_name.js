'use strict';
//定义代号
const CODE_NAME = {
    TARGET: {                   //选择目标
        OWN_PET_IN_PLAY: 0,         //己方当前战斗精灵(1只)
        OPPOSITE_PET_IN_PLAY: 0,    //对方当前精灵(1只)
        OWN_PETS_ON_STAGE: 0,       //己方场上精灵(单只或多只)
        OPPOSITE_PETS_ON_STAGE: 0,  //对方场上精灵(单只或多只)
        ALL_PETS_IN_PLAY: 0,        //双方当前战斗精灵(2只)
        ALL_PETS_ON_STAGE: 0        //双方场上精灵
    },
    ACTION: {
        ACTIVE: {
            USE_SKILL: 0,
            ATTACK: 0,
            REGEN_HP: 0,    //回血
            CRIT: 0         //暴击
        },
        PASSIVE: {
            ATTACKED: 0,    //被攻击
            DAMAGE: 0,      //受伤害
            DIED: 0,        //死亡
            CRITED: 0       //被暴击
        },
        STATE: {
            HP: 0,
            BUFFS: 0,
            PERCENTAGE_OF_HP: 0
        }
    }
}
const ACTION_STAGE = {
    STAGE_CREATE: 0,        //赛场创建阶段
    BEFORE_ON_STAGE: 0,     //登场前阶段
    AFTER_ON_STAGE: 0,      //登场后阶段
    BEFORE_USE_SKILL: 0,    //使用技能前阶段
    AFTER_USE_SKILL: 0,     //使用技能后阶段
    BEFORE_DAMAGE: 0,       //伤害施加前阶段
    AFTER_DAMAGE: 0,        //伤害施加后阶段
    BEFORE_DEATH: 0,        //死亡前阶段
    AFTER_DEATH: 0,         //死亡后阶段
    BEFORE_LEAVE_STAGE: 0,  //离场前阶段
    AFTER_LEAVE_STAGE: 0    //离场后阶段
}

const KEY_WORDS = {
    CHANCE: 0,  //概率
    INCLUDE: 0  //包含
}

exports.CODE_NAME = CODE_NAME;
exports.ACTION_STAGE = ACTION_STAGE;
exports.KEY_WORDS = KEY_WORDS;
