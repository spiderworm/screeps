
var roomUtil = require('roomUtil');

var controllersSystem = {
	tick: function() {
		this._creepQueues = {};
		this._needs = {};
		roomUtil.forEach(function(room) {
			if (room.controller) {
				var spaces = this.countOpenSpaces(room.controller);
				if (spaces) {
					this._needs[room.controller.id] = {controller: room.controller, count: spaces};
				}
			}.bind(this));
		}.bind(this));
	},
	countOpenSpaces: function(controller) {
		var x = controller.pos.x;
		var y = controller.pos.y;
		var spaces = roomUtil.getOpenSpaces(controller.room, y-1, x-1, y+1, x+1);
		return spaces.length;
	},
	addToWaitingQueue: function(controller, creep) {
		if (!this._creepQueues[controller.id]) {
			this._creepQueues[controller.id] = 0;
		}
		this._creepQueues[controller.id]++;
		if (this._needs[controller.id]) {
			this._needs[controller.id].count--;
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
			return this._needs[key];
		}
	},
	getNeedsCount: function() {
		var count = 0;
		Object.keys(this._needs).forEach(function(id) {
			count += this._needs[id].count;
		}.bind(this));
		return count;
	}
};

module.exports = controllersSystem;
