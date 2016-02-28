
var composer = require('composer');
var creepUtil = require('creepUtil');
var creepRoleSystem = require('creepRoleSystem');
var creepBoredomUtil = require('creepBoredomUtil');

var creepProcessingSystem = {

	tick: function() {

		creepUtil.forEach(function(creep) {
			var role = creepRoleSystem.getCreepRole(creep);
			var tick = creepRoleSystem.getTickFunction(role);
			tick(creep);
			if (creepBoredomUtil.getBoredom(creep) > 10) {
				if (creepRoleSystem.creepCanHaveRole(creep, creepRoleSystem.roles.harvester)) {
					creepRoleSystem.assignRole(creep, creepRoleSystem.roles.harvester);
					creepBoredomUtil.removeBoredom(creep);
				}
			}
		});

	}

};

composer.addFeature(creepProcessingSystem, 'memory', 'creepProcessingSystem');

module.exports = creepProcessingSystem;
