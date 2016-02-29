
var creepNamesUtil = require('creepNames');
var creepsUtil = require('creepsUtil');

var creepRoleUtil = {

	roles: {},

	addRole: function(role) {
		this.roles[role.name] = role;
	},

	assignRole: function(creep, role) {
		//console.log(creep.name,'is now a ', role.name, '!');
		creep.memory.role = role.name;
	},

	createCreep: function(role) {
		var creep;
		if (Game.spawns.Spawn1.canCreateCreep(role.body) === OK) {
			var name = creepNamesUtil.getNext(role.name);
			name = Game.spawns.Spawn1.createCreep(role.body, name, {role: role.name});
			creep = Game.creeps[name];
		}
		return creep;
	},

	creepHasParts: function(creep, role) {
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
	},
	
	creepCanHaveRole: function(creep, role) {
		return this.creepHasRole(creep, role) || this.creepHasParts(creep, role);
	},

	creepHasRole: function(creep, role) {
		return creep.memory.role === role.name;
	},
	
	getCreepsInRole: function(role) {
		return creepsUtil.findAll({memory: {role: role.name}});
	}

};


creepRoleUtil.roleUtilFactory = {
	
	create: function(role) {

		var util = {
		
			assignRole: function(creep) {
				return creepRoleUtil.assignRole(creep, role);
			},
		
			createHarvester: function() {
				return creepRoleUtil.createCreep(role);
			},

			creepCanHaveRole: function(creep) {
				return creepRoleUtil.creepCanHaveRole(creep, role);
			},

			creepHasRole: function(creep) {
				return creepRoleUtil.creepHasRole(creep, role);
			},

			forEach: function(callback) {
				creepRoleUtil.getCreepsInRole(role).forEach(callback);
			}
		
		};
		
		return util;

	}
	
};


module.exports = creepRoleUtil;
