
var creepLogUtil = require('creepLogUtil');
var wandererUtil = require('wandererUtil');

var wanderSystem = {

	tick: function() {
		wandererUtil.forEach(function(creep) {
			this.wander(creep);
		}.bind(this));
	},
	
	wander: function(creep) {
		var destination = creep.memory.wanderDestination;
		
		if (!destination || Math.random < .001) {
			destination = {
				x: Math.floor(50 * Math.random()),
				y: Math.floor(50 * Math.random())
			};
		};

		creep.memory.wanderDestination = destination;

		try {
			var result = creep.moveTo(destination.x, destination.y);
		} catch(e) {
			console.log(e.message);
		}
		switch(result) {
			case OK:
				//creepLogUtil.log(creep);
			break;
			case ERR_BUSY:
			break;
			default:
				//console.log(creep.name, "got unexpected wander result", result);
			break;
		}
	}

};

module.exports = wanderSystem;
