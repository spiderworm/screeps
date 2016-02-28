
var composer = require('composer');

var creepBoredomUtil = {
	addBoredom: function(creep) {
		var memory = this.memory(creep);
		if (!memory.level) {
			memory.level = 0;
		}
		memory.level++;
	},
	removeBoredom: function(creep) {
		this.memory(creep).level = 0;
	},
	getBoredom: function(creep) {
		return this.memory(creep).level;
	}
};

composer.addFeature(creepBoredomUtil, 'creepMemory', 'boredom');

module.exports = creepBoredomUtil;
