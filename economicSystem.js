
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
		this.clearNeeds();
		roomUtil.forEach(function(room) {
			if (room.controller) {
				var spaces = controllersSystem.countOpenUpgradeSpaces(room.controller);
				if (spaces) {
					this.addNeed('upgrade', {controller: room.controller, count: spaces});
				}
			}
		}.bind(this));
	},
	assignRole: function(creep) {
		var role;
		if (creepRoleSystem.creepCanHaveRole(creep, harvester.role)) {
			var need = sourcesSystem.getNeed();
			if (need) {
				need.count--;
				creepRoleSystem.assignRole(creep, harvester.role);
				harvester.assignSource(creep, need.source);
				role = harvester.role;
			}
		}
		if (!role && creepRoleSystem.creepCanHaveRole(creep, upgrader.role)) {
			if (this.needs.upgrade) {
				var need = this.needs.upgrade.find(function(need) {
					return need.count > 0;
				});
				if (need) {
					need.count--;
					creepRoleSystem.assignRole(creep, upgrader.role);
					upgrader.assignController(creep, need.controller);
					role = upgrader.role;
				}
			}
		}
		return role;
	},
	getSpawnNeeds: function() {
		var result = [];
		var sourceNeeds = sourcesSystem.getNeedsCount();
		if (sourceNeeds > 0) {
			result.push({role: harvester.role, count: sourceNeeds});
		}
		if (this.needs.upgrade) {
			var upgraderNeed = {role: upgrader.role, count: 0};
			this.needs.upgrade.forEach(function(need) {
				upgraderNeed.count += need.count;
			});
			result.push(upgraderNeed)
		}
		return result;
	}
};

composer.addFeature(economicSystem, 'memory', 'economicSystem');
composer.addFeature(economicSystem, 'needs');

module.exports = economicSystem;
