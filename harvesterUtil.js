
var creepRoleUtil = require('creepRoleUtil');

var role = {
    name: 'harvester',
    body: [WORK, CARRY, MOVE]
};

creepRoleUtil.addRole(role);

var harvesterUtil = creepRoleUtil.roleUtilFactory.create(role);

harvesterUtil.assignSource = function(creep, source) {
    creep.memory.source = source.id;
};

module.exports = harvesterUtil;
