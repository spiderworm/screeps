
var composer = require('composer');
var spawnUtil = require('spawnUtil');
var creepRoleUtil = require('creepRoleUtil');
var creepNames = require('creepNames');

var spawnSystem = {
	upgrade: function() {
		if (!this.memory.queue) {
			this.memory.queue = [];
		}
	},
	tick: function() {
		spawnUtil.forEach(function(mySpawn) {
			if (this.memory.queue[0]) {
				var role = creepRoleUtil.roles[this.memory.queue[0]];
				var reason = mySpawn.canCreateCreep(role.body);
				if (reason === OK) {
					this.memory.queue.shift();
					var result = mySpawn.createCreep(role.body, creepNames.getNext(role.name), {role: role.name});
				} else {
					//console.log('cant make creep:', role.name, reason);
				}
			}
		}.bind(this));
	},
	queue: function(role) {
		this.memory.queue.push(role.name);
		console.log('added',role.name,'to spawn queue');
	},
	unqueueAll: function(role) {
		this.memory.queue = this.memory.queue.filter(function(name) { return name !== role.name; });
	},
	queueUpTo: function(role, count) {
		var currentCount = this.countQueue(role);
		for (var i=currentCount; i<count; i++) {
			this.queue(role);
		}
	},
	countQueue: function(role) {
		return this.memory.queue.filter(function(name) { return name === role.name; }).length;
	}
};

composer.addFeature(spawnSystem, 'memory', 'spawnSystem');

module.exports = spawnSystem;
