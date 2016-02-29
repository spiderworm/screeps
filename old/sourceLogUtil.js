
var MAX_LOGS = 10;

var sourceLogUtil = {
	upgrade: function(source) {
		if (!Memory.sources) {
			Memory.sources = {};
		}
		if (!Memory.sources[source.id]) {
			Memory.sources[source.id] = {};
		}
		var memory = Memory.sources[source.id];
		if (!memory.logs) {
			memory.logs = {};
		}
		if (Array.isArray(memory.logs)) {
			memory.logs = {
				entries: memory.logs
			};
		}
		if (!memory.logs.entries) {
			memory.logs.entries = [];
		}
	},
	getLogs: function(source) {
		return this._getMemory(source).entries;
	},
	log: function(source) {
		var memory = this._getMemory(source);
		memory.entries.unshift({ date: (new Date()).getTime() });
		if (memory.entries.length > MAX_LOGS) {
			memory.entries = memory.entries.slice(0, MAX_LOGS);
		}
	},
	_getMemory: function(source) {
		this.upgrade(source);
		return Memory.sources[source.id].logs;
	}
};

module.exports = sourceLogUtil;
