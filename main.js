
var systems = [
    require('loopSystem'),
    require('creepRoleSystem'),
    require('defenseSystem'),
    require('economicSystem'),
    require('attackSystem'),
    require('creepProcessingSystem'),
    require('spawnSystem')

    /*
    require('creepBoredomSystem'),
    require('defenseSystem'),
    require('turretSystem'),
    //require('captureSystem'),
    //require('commanderSystem'),
    require('upgraderSystem'),
    require('economySystem'),
    require('harvestSystem'),
    require('wanderSystem'),
    require('spawnSystem')
    */
];

systems.forEach(function(system) {
    if (system.upgrade) {
        system.upgrade();
    }
    if (system.init) {
        system.init();
    }
});

module.exports.loop = function () {
    var error = null;

    systems.forEach(function(system) {
        try {
            if (system.tick) {
                system.tick();
            }
        } catch(e) {
            console.log('system error', e.message);
            if (!error) {
                error = e;
            }
        }
    });

    if (error) {
        throw error;   
    }

    /*

	for(var name in Game.creeps) {
		var creep = Game.creeps[name];

		if(creep.memory.role == 'builder') {
		
			if(creep.carry.energy == 0) {
				if(Game.spawns.Spawn1.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
					creep.moveTo(Game.spawns.Spawn1);				
				}
			}
			else {
				var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
				if(targets.length) {
					if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[0]);					
					}
				}
			}
		}
		
		if(creep.memory.role == 'guard') {
        	var targets = creep.room.find(FIND_HOSTILE_CREEPS);
        	if(targets.length) {
        		if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
        			creep.moveTo(targets[0]);		
        		}
        	}
        }
	}
	*/

}