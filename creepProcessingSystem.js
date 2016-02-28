
var composer = require('composer');
var creepUtil = require('creepUtil');
var creepRoleSystem = require('creepRoleSystem');

var creepProcessingSystem = {
    tick: function() {
    	creepUtil.forEach(function(creep) {
    		var role = creepRoleSystem.getCreepRole(creep);
    		var tick = creepRoleSystem.getTickFunction(role);
    		tick(creep);
    	});
    }
};

composer.addFeature(creepProcessingSystem, 'memory', 'creepProcessingSystem');

module.exports = creepProcessingSystem;
