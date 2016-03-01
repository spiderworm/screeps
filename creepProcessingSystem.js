
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
				if (!this.findRole(creep) && creepBoredomUtil.getBoredom(creep) > 20) {
				    //creep.suicide();
				};
			}
		}.bind(this));
	},

	findRole: function(creep) {
		var role = economicSystem.assignRole(creep);
		return role;
	}

};

composer.addFeature(creepProcessingSystem, 'memory', 'creepProcessingSystem');

module.exports = creepProcessingSystem;
