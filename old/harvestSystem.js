
var creepLogUtil = require('creepLogUtil');
var sourceUtil = require('sourceUtil');
var sourceLogUtil = require('sourceLogUtil');
var harvesterUtil = require('harvesterUtil');

var harvestSystem = {

	tick: function() {
		harvesterUtil.forEach(function(creep) {
			this.harvest(creep);
		}.bind(this));
	},
	
	harvest: function(creep) {
		if(creep.carry.energy >= creep.carryCapacity) {
			return this.deliver(creep);			
		}

		try {
			//var source = creep.room.find(FIND_SOURCES)[0];
			var source = sourceUtil.getById(creep.memory.source);
			var result = creep.harvest(source);
		} catch(e) {
			console.log(e.message);
		}
		switch(result) {
			case OK:
				sourceLogUtil.log(source);
				creepLogUtil.log(creep);
			break;
			case ERR_NOT_IN_RANGE:
				this.approachHarvest(creep);
			break;
			case ERR_INVALID_TARGET:
				//console.log(creep.name, "apparently cant find source", source ? source.id : source);
			break;
			case ERR_BUSY:
			break;
			default:
				console.log(creep.name, "got unexpected harvest result", result);
			break;
		}
	},
	
	approachHarvest: function(creep) {
		var source = sourceUtil.getById(creep.memory.source);
		var result = creep.moveTo(source);
		switch(result) {
			case OK:
				creepLogUtil.log(creep);
			break;
		}
	},
	
	deliver: function(creep) {
		var result = creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY);
		switch(result) {
			case OK:
				creepLogUtil.log(creep);
			break;
			case ERR_NOT_IN_RANGE:
				this.approachSpawn(creep);
			break;
			case ERR_FULL:
			break;
		}
	},
	
	approachSpawn: function(creep) {
		var result = creep.moveTo(Game.spawns.Spawn1);
		creepLogUtil.log(creep);
	}
};

module.exports = harvestSystem;
