
var creepRoleUtil = require('creepRoleUtil');
var wanderSystem = require('wanderSystem');
var creepLogUtil = require('creepLogUtil');

var role = {
	name: 'commander',
	body: [MOVE, CLAIM]
};

creepRoleUtil.addRole(role);

var commanderUtil = creepRoleUtil.roleUtilFactory.create(role);

var commanderSystem = {
	tick: function() {
		commanderUtil.forEach(function(creep) {
			console.log('commander');
			this.upgrade(creep);
			creepLogUtil.log(creep);
		}.bind(this));
	},
	
	makeCommander: function(creep) {
		commanderUtil.assignRole(creep);
	},

	capture: function(creep) {
		var controller = creep.room.controller;
		if (controller) {
			var result = creep.upgradeController(controller);
			switch (result) {
				case OK:
				break;
				case ERR_NOT_IN_RANGE:
					this.moveTo(creep, controller);
				break;
				case ERR_NOT_ENOUGH_RESOURCES:
					
				break;
				default:
					console.log(creep.name,'had unexpected capture result',result);
				break;
			}
		}
	},
	
	moveTo: function(creep, controller) {
		var result = creep.moveTo(controller);
		switch (result) {
			case OK:
			break;
			default:
				console.log(creep.name,'had unexpected moveTo result',result);
			break;
		}
	}
};

module.exports = commanderSystem;
