
var MAX_LOGS = 10;

var creepLogUtil = {
	upgrade: function(creep) {
		if (!creep.memory.logs) {
			creep.memory.logs = {
				entries: []
			};
		};
		if (Array.isArray(creep.memory.logs)) {
			creep.memory.logs = {
				entries: creep.memory.logs
			};
		}
	},
	getLogs: function(creep) {
		this.upgrade(creep);
		return this._getMemory(creep).entries;
	},
	log: function(creep) {
		var memory = this._getMemory(creep);
		memory.entries.unshift({ date: (new Date()).getTime() });
		if (memory.entries.length > MAX_LOGS) {
			memory.entries = memory.entries.slice(0, MAX_LOGS);
		}
	},
	_getMemory: function(creep) {
		this.upgrade(creep);
		return creep.memory.logs;
	}
};

module.exports = creepLogUtil;
