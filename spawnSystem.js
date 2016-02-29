
var composer = require('composer');
var spawnUtil = require('spawnUtil');
var creepNames = require('creepNames');
var creepRoleSystem = require('creepRoleSystem');

function SpawnSystem() {}
SpawnSystem.prototype.upgrade = function() {
	if (!this.memory.queue) {
		this.memory.queue = [];
	}
};
SpawnSystem.prototype.tick = function() {

	var spawnNeeds = economicSystem.getSpawnNeeds();
	spawnNeeds.forEach(function(need) {
		this.queueUpTo(need.role, need.count);
	});

	spawnUtil.forEach(function(mySpawn) {
		if (this.memory.queue[0]) {
			var role = creepRoleSystem.roles[this.memory.queue[0]];
			var reason = mySpawn.canCreateCreep(role.body);
			if (reason === OK) {
				this.memory.queue.shift();
				var result = mySpawn.createCreep(role.body, creepNames.getNext(role.name), {role: role.name});
			} else {
				//console.log('cant make creep:', role.name, reason);
			}
		}
	}.bind(this));

};
SpawnSystem.prototype.queue = function(role) {
	this.memory.queue.push(role.name);
	console.log('added',role.name,'to spawn queue');
};
SpawnSystem.prototype.unqueueAll = function(role) {
	this.memory.queue = this.memory.queue.filter(function(name) { return name !== role.name; });
};
SpawnSystem.prototype.queueUpTo = function(role, count) {
	var currentCount = this.countQueue(role);
	for (var i=currentCount; i<count; i++) {
		this.queue(role);
	}
};
SpawnSystem.prototype.countQueue = function(role) {
	return this.memory.queue.filter(function(name) { return name === role.name; }).length;
};

composer.addFeature(SpawnSystem.prototype, 'memory', 'spawnSystem');

module.exports = new SpawnSystem();
