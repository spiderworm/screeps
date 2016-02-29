
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
	return role.tick;
};
CreepRoleSystem.prototype.assignRole = function(creep, role) {
	creep.memory.role = role.name;
};
CreepRoleSystem.prototype.creepCanHaveRole = function(creep, role) {
	return this.creepHasRole(creep, role) || this.creepHasParts(creep, role);
};
CreepRoleSystem.prototype.creepHasRole = function(creep, role) {
	return creep.memory.role === role.name;
};
CreepRoleSystem.prototype.creepHasParts = function(creep, role) {
	var neededParts = [].concat(role.body);
	creep.body.forEach(function(part) {
		if (part.hits > 0) {
			var i = neededParts.indexOf(part.type);
			if (i !== -1) {
				neededParts.splice(i,1);
			}
		}
	});
	var result = neededParts.length === 0;
	return result;
};
	
module.exports = new CreepRoleSystem();
