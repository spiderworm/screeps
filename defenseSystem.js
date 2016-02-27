
var composer = require('composer');
var creepRoleUtil = require('creepRoleUtil');
var loopSystem = require('loopSystem');
var spawnSystem = require('spawnSystem');
var turretSystem = require('turretSystem');

var defenseSystem = {
    tick: function() {
        loopSystem.addLoop(
            'turret creation loop',
            function() { spawnSystem.queue(creepRoleUtil.roles.turret); },
            60000
        );
        loopSystem.addLoop(
            'upgrader creation loop',
            function() {
                spawnSystem.queue(creepRoleUtil.roles.upgrader);
            },
            10000
        );
    }
};

composer.addFeature(defenseSystem, 'memory', 'defenseSystem');

module.exports = defenseSystem;
