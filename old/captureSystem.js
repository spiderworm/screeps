
var composer = require('composer');
var creepRoleUtil = require('creepRoleUtil');
var loopSystem = require('loopSystem');
var spawnSystem = require('spawnSystem');
var commanderSystem = require('commanderSystem');

var captureSystem = {
    tick: function() {
        loopSystem.addLoop(
            'commader creation loop',
            function() {
                spawnSystem.queue(creepRoleUtil.roles.commander);
            },
            60000
        );
    }
};

composer.addFeature(captureSystem, 'memory', 'captureSystem');

module.exports = captureSystem;
