
var memoryUtil = require('memoryUtil');
var timeUtil = require('timeUtil');

var loopSystem = {
	upgrade: function() {
		if (!this._memory.loops) {
			this._memory.loops = {};
		}
	},
	tick: function() {
		this._loops = {};
	},
	addLoop: function(id, callback, ms) {
		if (!id) {
			throw new Error('sorry, gonna need an id');
		}
		if (this._loops[id]) {
			throw new Error('duplicate loop id \'' + id + '\'');
		}
		this._loops[id] = {
			callback: callback,
			ms: ms
		};
		var memory = this._memory;
		if (!memory.loops[id]) {
			memory.loops[id] = timeUtil.now() + ms;
		}
		this._checkLoop(id);
		return id;
	},
	_checkLoop: function(id) {
		var target = this._memory.loops[id];
		var now = timeUtil.now();
		if (target <= now) {
			this._memory.loops[id] += this._loops[id].ms;
			this._loops[id].callback.call(global);
			this._checkLoop(id);
		}
	}
};

Object.defineProperty(loopSystem, '_memory', {
	get: function() { return memoryUtil.get('loopSystem'); }
});

module.exports = loopSystem;
