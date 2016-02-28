
function CreepRoleSystem() {
    this.roles = {};
}
CreepRoleSystem.prototype.addRoles = function() {
	Array.prototype.forEach.call(arguments, function(role) {
		this.addRole(role);
	}.bind(this));
};
CreepRoleSystem.prototype.addRole = function(role) {
	this.roles[role.name] = role;
};
CreepRoleSystem.prototype.getCreepRole = function(creep) {
	return this.roles[creep.memory.role];
};
CreepRoleSystem.prototype.getTickFunction = function(role) {
	return require(role.tick);
};

module.exports = new CreepRoleSystem();
