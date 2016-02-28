
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

	tickCreep: function(creep) {
		switch(this._getTask(creep)) {
			case UPGRADE_TASK:
				this.upgradeController(creep, creep.room.controller);
			break;
			default:
				this.harvest(creep, sourceUtil.getById(this.memory(creep).source));
			break;
		}
	},

	startHarvesting: function(creep) {
		this.memory(creep).task = HARVEST_TASK;
	},

	startUpgrading: function(creep) {
		this.memory(creep).task = UPGRADE_TASK;
	},

	harvest: function(creep, source) {
		if (source) {
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
		} else {
			creepBoredomUtil.addBoredom(creep);
		}
	},
	
	upgradeController: function(creep, controller) {
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

	_getTask: function(creep) {
		var memory = this.memory(creep);
		if (!memory.task || (memory.task === UPGRADE_TASK && creep.carry.energy === 0)) {
			this.startHarvesting(creep);
		} else if (memory.task === HARVEST_TASK && creep.carry.energy >= creep.carryCapacity) {
			this.startUpgrading(creep);
		}
		if (memory.task === HARVEST_TASK && (creepBoredomUtil.getBoredom(creep) > 5 || !memory.source)) {
			this._chooseSource(creep);
		}
		return memory.task;
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
	upgrader.tickCreep.bind(upgrader)
);

composer.addFeature(upgrader, 'creepMemory', 'upgrader');

module.exports = upgrader;
