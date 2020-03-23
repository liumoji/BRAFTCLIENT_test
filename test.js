'use strict';
const b3 = require('./lib/bts/index.js');
const pokemonBts = require('./config/behavior_trees/export/pokemon.json');
const blackboard = new b3.Blackboard();
const pokemon = new b3.BehaviorTree();

pokemon.load(pokemonBts);
setInterval(() => {
    console.log('tick');
    pokemon.tick(null, blackboard);
}, 1000);