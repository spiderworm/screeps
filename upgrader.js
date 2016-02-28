
var Role = require('Role');

var upgrader = {
	upgrade: function(creep) {

		console.info('upgrader');

	}
};

upgrader.role = Role.create(
	'upgrader',
	[WORK, CARRY, MOVE],
	upgrader.upgrade.bind(upgrader)
);

module.exports = upgrader;
