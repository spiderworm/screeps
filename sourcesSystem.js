
var roomUtil = require('roomUtil');

var sourcesSystem = {
	_sources: {},
	tick: function() {
		this._creepQueues = {};
		this._needs = {};
		roomUtil.forEach(function(room) {
			roomUtil.getSources(room).forEach(function(source) {
				var spaces = this.countOpenHarvestSpaces(source);
				if (spaces) {
					this._needs[source.id] = {source: source, count: spaces};
				}
			}.bind(this));
		}.bind(this));
	},
	getById: function(id) {
		if (!this._sources[id]) {
			this.refresh();
		}
		return this._sources[id];
	},
	refresh: function(id) {
		roomUtil.forEach(function(room) {
			roomUtil.getSources(room).forEach(function(source) {
				this._sources[source.id] = source;
			}.bind(this));
		}.bind(this));
	},
	countOpenHarvestSpaces: function(source) {
		var x = source.pos.x;
		var y = source.pos.y;
		var count = roomUtil.getOpenSpaces(source.room, y-1, x-1, y+1, x+1).length;
		return count;
	},
	addToWaitingQueue: function(source, creep) {
		if (!this._creepQueues[source.id]) {
			this._creepQueues[source.id] = 0;
		}
		this._creepQueues[source.id]++;
		if (this._needs[source.id]) {
			this._needs[source.id].count--;
		}
	},
	getNeed: function() {
		var key = Object.keys(this._needs).find(function(id) {
			if (this._needs[id].count <= 0) {
				delete this._needs[id];
			}
			if (this._needs[id]) {
				return true;
			}
		}.bind(this));
		if (key) {
			return this._needs[id];
		}
	}
};

module.exports = sourcesSystem;
