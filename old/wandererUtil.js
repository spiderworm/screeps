
var creepRoleUtil = require('creepRoleUtil');

var role = {
	name: 'wanderer',
	body: [MOVE]
};

creepRoleUtil.addRole(role);

var wandererUtil = creepRoleUtil.roleUtilFactory.create(role);

module.exports = wandererUtil;
