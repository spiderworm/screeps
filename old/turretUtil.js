
var creepRoleUtil = require('creepRoleUtil');
var wanderSystem = require('wanderSystem');

var role = {
	name: 'turret',
	body: [MOVE, RANGED_ATTACK]
};

creepRoleUtil.addRole(role);

var turretUtil = creepRoleUtil.roleUtilFactory.create(role);

var turretSystem = {
	tick: function() {
		turretUtil.forEach(function(creep) {
			wanderSystem.wander(creep);
		}.bind(this));
	},
	
	move: function(creep) {}
};

module.exports = turretSystem;
