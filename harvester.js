
var sourceUtil = require('sourceUtil');
var Role = require('Role');

var harvester = {

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
				//creepLogUtil.log(creep);
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
				console.log(creep.name, "got unexpected harvest result", result);
			break;
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
                //creepLogUtil.log(creep);
            break;
        }
    }
    
};


harvester.role = Role.create(
	'harvester',
	[WORK, CARRY, MOVE], 
	harvester.harvest.bind(harvester)
);


module.exports = harvester;
