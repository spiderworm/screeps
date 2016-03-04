
var composer = require('composer');
var roomUtil = require('roomUtil');
var sourcesSystem = require('sourcesSystem');
var controllersSystem = require('controllersSystem');
var harvester = require('harvester');
var upgrader = require('upgrader');
var creepRoleSystem = require('creepRoleSystem');

creepRoleSystem.addRoles(harvester.role, upgrader.role);

var economicSystem = {
	tick: function() {
	},
	assignRole: function(creep) {
		var role;
		var need = sourcesSystem.getNeed();
		if (need) {
			if (creepRoleSystem.creepCanHaveRole(creep, harvester.role)) {
				need.count--;
				creepRoleSystem.assignRole(creep, harvester.role);
				harvester.assignSource(creep, need.source);
				return harvester.role;
			}
			if (!role && creepRoleSystem.creepCanHaveRole(creep, upgrader.role)) {
				need.count--;
				creepRoleSystem.assignRole(creep, upgrader.role);
				upgrader.assignController(creep, need.controller);
				return upgrader.role;
			}
		}
	},
	getSpawnNeeds: function() {
		var result = [];
		var sourceNeeds = sourcesSystem.getNeedsCount();
		if (sourceNeeds > 0) {
			result.push({role: harvester.role, count: sourceNeeds});
		}
		var upgradeNeeds = controllersSystem.getNeedsCount();
		if (upgradeNeeds > 0) {
			result.push({role: upgrader.role, count: upgradeNeeds});
		}
		return result;
	}
};

composer.addFeature(economicSystem, 'memory', 'economicSystem');
//composer.addFeature(economicSystem, 'needs');

module.exports = economicSystem;
