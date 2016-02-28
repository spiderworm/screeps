
var creepRoleUtil = require('creepRoleUtil');

var role = {
    name: 'builder',
    body: [WORK, CARRY, MOVE]
};

creepRoleUtil.addRole(role);

var builderUtil = creepRoleUtil.roleUtilFactory.create(role);

builderUtil.assignSite = function(creep, site) {
    
};

module.exports = builderUtil;
