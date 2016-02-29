
var composer = require('composer');
var sourceUtil = require('sourceUtil');
var Role = require('Role');
var creepBoredomUtil = require('creepBoredomUtil');
var any = require('any');
var roomUtil = require('roomUtil');

var harvester = {

	tickCreep: function(creep) {
		var source = this._getSource(creep);
		this.harvest(creep);
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

	deliver: function(creep) {
		var result = creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY);
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
				creepBoredomUtil.removeBoredom(creep);
			break;
			default:
				creepBoredomUtil.addBoredom(creep);
			break;
		}
	},

    _getSource: function(creep) {
		var memory = this.memory(creep);
		if (!memory.source) {
			memory.source = any.of(roomUtil.getSources(creep.room)).id;
		}
		return sourceUtil.getById(memory.source);
    }
    
};


harvester.role = Role.create(
	'harvester',
	[WORK, CARRY, MOVE], 
	harvester.tickCreep.bind(harvester)
);

composer.addFeature(harvester, 'creepMemory', 'harvester');

module.exports = harvester;
