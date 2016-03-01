
var composer = require('composer');
var sourcesSystem = require('sourcesSystem');
var Role = require('Role');
var creepBoredomUtil = require('creepBoredomUtil');
var any = require('any');
var roomUtil = require('roomUtil');

var DELIVER_TASK = 'deliver';
var HARVEST_TASK = 'harvest';

var harvester = {

	tickCreep: function(creep) {
		var task = this._getTask(creep);
		switch(task) {
			case DELIVER_TASK:
				var spawn = Game.spawns.Spawn1;
				this.deliver(creep, spawn);
			break;
			default:
				var source = this._getSource(creep);
				this.harvest(creep, source);
			break;
		}
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
					creepBoredomUtil.clearBoredom(creep);
				break;
				case ERR_NOT_IN_RANGE:
					if (this.moveTo(creep, source) !== OK) {
						sourcesSystem.addToWaitingQueue(source, creep);
					}
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

	deliver: function(creep, target) {
		var result = creep.transfer(target, RESOURCE_ENERGY);
		switch(result) {
			case OK:
				//creepLogUtil.log(creep);
			break;
			case ERR_NOT_IN_RANGE:
				this.moveTo(creep, Game.spawns.Spawn1);
			break;
			case ERR_FULL:
			break;
		}
	},
	
	moveTo: function(creep, pos) {
		var result = creep.moveTo(pos);
		switch(result) {
			case OK:
				creepBoredomUtil.clearBoredom(creep);
				return true;
			break;
			case ERR_NO_PATH:
			    creep.say('no path');
				creepBoredomUtil.addBoredom(creep);
			break;
			default:
				creepBoredomUtil.addBoredom(creep);
			break;
		}
		return result;
	},

	assignSource: function(creep, source) {
		this.memory(creep).source = source.id;
	},

	_getSource: function(creep) {
		var memory = this.memory(creep);
		if (!memory.source) {
			this.assignSource(creep, any.of(roomUtil.getSources(creep.room)));
		}
		return sourcesSystem.getById(memory.source);
	},

	_getTask: function(creep) {
		if (creep.carry.energy >= creep.carryCapacity) {
			return DELIVER_TASK;
		}
		return HARVEST_TASK;
	}
	
};


harvester.role = Role.create(
	'harvester',
	[WORK, CARRY, MOVE], 
	harvester.tickCreep.bind(harvester)
);

composer.addFeature(harvester, 'creepMemory', 'harvester');

module.exports = harvester;
