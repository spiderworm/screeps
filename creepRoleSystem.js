
var creepRoleSystem = {
	init: function() {
		this.roles = {};
	},
	addRoles: function() {
		Array.prototype.forEach.call(arguments, function(role) {
			this.addRole(role);
		}.bind(this));
	},
	addRole: function(role) {
		this.roles[role.name] = role;
	},
	getCreepRole: function(creep) {
		return this.roles[creep.memory.role];
	},
	getTickFunction: function(role) {
		return require(role.tick);
	}
};

module.exports = creepRoleSystem;
