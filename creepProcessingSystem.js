
var composer = require('composer');
var creepUtil = require('creepUtil');
var creepRoleSystem = require('creepRoleSystem');
var creepBoredomUtil = require('creepBoredomUtil');
var economicSystem = require('economicSystem');

var creepProcessingSystem = {

	tick: function() {

		creepUtil.forEach(function(creep) {
			var role = creepRoleSystem.getCreepRole(creep);
			var tick = creepRoleSystem.getTickFunction(role);
			tick(creep);
			if (creepBoredomUtil.getBoredom(creep) > 10) {
				if (economicSystem.giveRole(creep))
				if (creepRoleSystem.creepCanHaveRole(creep, creepRoleSystem.roles.harvester)) {
					creepRoleSystem.assignRole(creep, creepRoleSystem.roles.harvester);
					creepBoredomUtil.removeBoredom(creep);
				}
			}
		});

	},

	findRole: function(creep) {
		var role = econommicSystem.assignRole(creep);
	}

};

composer.addFeature(creepProcessingSystem, 'memory', 'creepProcessingSystem');

module.exports = creepProcessingSystem;
