
var creepRoleUtil = require('creepRoleUtil');
var wanderSystem = require('wanderSystem');
var creepLogUtil = require('creepLogUtil');
var sourceLogUtil = require('sourceLogUtil');
var any = require('any');
var roomUtil = require('roomUtil');
var sourceUtil = require('sourceUtil');

var role = {
	name: 'upgrader',
	body: [WORK, CARRY, MOVE]
};

creepRoleUtil.addRole(role);

var upgraderUtil = creepRoleUtil.roleUtilFactory.create(role);

var upgraderSystem = {
	tick: function() {
		upgraderUtil.forEach(function(creep) {
			console.log('upgrader', creep);
			if (this._isHarvestMode(creep)) {
				this.harvest(creep);
			} else {
				this.upgradeController(creep);
			}
		}.bind(this));
	},

	upgradeController: function(creep) {
		if (creep.carry.energy === 0) {
			this._setHarvestMode(creep);
		}
		var controller = creep.room.controller;
		if (controller) {
			var result = creep.upgradeController(controller);
			console.log(creep.name,'upgradeController result',result);
			switch (result) {
				case OK:
					creepLogUtil.log(creep);
				break;
				case ERR_NOT_IN_RANGE:
					this.moveTo(creep, controller);
				break;
				case ERR_NOT_ENOUGH_RESOURCES:
				break;
				default:
					//console.log(creep.name,'had unexpected upgrade result',result);
				break;
			}
		}
	},
	
	moveTo: function(creep, pos) {
		//console.log(creep.name,'moveTo');
		var result = creep.moveTo(pos);
		creepLogUtil.log(creep);
		switch (result) {
			case OK:
			break;
			default:
				//console.log(creep.name,'had unexpected moveTo result',result);
			break;
		}
	},
	
	harvest: function(creep) {
		if (creep.carry.energy >= creep.carryCapacity) {
			this._setUpgradeMode(creep);
		}
		var memory = creep.memory;
		var source;
		if (memory.source) {
			source = sourceUtil.getById(creep.memory.source);
		}
		if (!source) {
			source = any.of(roomUtil.getSources(creep.room));
			memory.source = source.id;
		}
		try {
			var result = creep.harvest(source);
			//console.log('harvest result',result);
		} catch(e) {
			//console.log(e.message);
		}
		switch(result) {
			case OK:
				sourceLogUtil.log(source);
				creepLogUtil.log(creep);
			break;
			case ERR_NOT_IN_RANGE:
				this.moveTo(creep, source);
			break;
			case ERR_INVALID_TARGET:
				//console.log(creep.name, "apparently cant find source", source ? source.id : source);
			break;
			case ERR_BUSY:
			break;
			default:
				//console.log(creep.name, "got unexpected harvest result", result);
			break;
		}
	},
	
	_isHarvestMode: function(creep) {
		return creep.memory.upgradeMode === 'harvest';
	},
	
	_setHarvestMode: function(creep) {
		creep.memory.upgradeMode = 'harvest';
	},
	
	_setUpgradeMode: function(creep) {
		creep.memory.upgradeMode = 'upgrade';
	}
};

module.exports = upgraderSystem;
