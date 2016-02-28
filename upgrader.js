
var Role = require('Role');
var creepMemoryUtil = require('creepMemoryUtil');
var composer = require('composer');
var any = require('any');
var roomUtil = require('roomUtil');
var sourceUtil = require('sourceUtil');
var creepBoredomUtil = require('creepBoredomUtil');

var UPGRADE_TASK = 'upgrade';
var HARVEST_TASK = 'harvest';

var upgrader = {
	upgrade: function(creep) {
		switch(this.getTask(creep)) {
			case UPGRADE_TASK:
				this.upgradeController(creep);
			break;
			default:
				this.harvest(creep);
			break;
		}
	},

	getTask: function(creep) {
		var memory = this.memory(creep);
		var task = memory.task;
		if (!task || (task === UPGRADE_TASK && creep.carry.energy === 0)) {
			this.startHarvesting(creep);
		} else if (task === HARVEST_TASK && creep.carry.energy >= creep.carryCapacity) {
			this.startUpgrading(creep);
		}
		return memory.task;
	},

	startHarvesting: function(creep) {
		this.memory(creep).task = HARVEST_TASK;
	},

	startUpgrading: function(creep) {
		this.memory(creep).task = UPGRADE_TASK;
	},

	harvest: function(creep) {
		var memory = this.memory(creep);

		if (creepBoredomUtil.getBoredom(creep) > 5 || !memory.source) {
			this._chooseSource(creep);
		}

		var source = sourceUtil.getById(memory.source);
		
		try {
			var result = creep.harvest(source);
		} catch(e) {
			console.log(e.message);
		}

		switch(result) {
			case OK:
				creepBoredomUtil.removeBoredom(creep);
			break;
			case ERR_NOT_IN_RANGE:
				this.moveTo(creep, source);
			break;
			case ERR_BUSY:
			break;
			case ERR_INVALID_TARGET:
			default:
				creepBoredomUtil.addBoredom(creep);
			break;
		}
	},
	
	upgradeController: function(creep) {
		var controller = creep.room.controller;
		if (controller) {
			var result = creep.upgradeController(controller);
			switch(result) {
				case OK:
					creepBoredomUtil.removeBoredom(creep);
				break;
				case ERR_NOT_IN_RANGE:
					this.moveTo(creep, controller);
				break;
				case ERR_FULL:
				default:
					creepBoredomUtil.addBoredom(creep);
				break;
			}
		} else {
			creepBoredomUtil.addBoredom(creep);
		}
	},
	
	moveTo: function(creep, pos) {
		var result = creep.moveTo(pos);
		switch(result) {
			case OK:
				creepBoredomUtil.removeBoredom(creep);
			break;
			default:
				creepBoredomUtil.addBoredom(creep);
			break;
		}
	},

	_chooseSource: function(creep) {
		var memory = this.memory(creep);
		if (!memory.source) {
			memory.source = any.of(roomUtil.getSources(creep.room)).id;
		}
	}

};

upgrader.role = Role.create(
	'upgrader',
	[WORK, CARRY, MOVE],
	upgrader.upgrade.bind(upgrader)
);

composer.addFeature(upgrader, 'creepMemory', 'upgrader');

module.exports = upgrader;
