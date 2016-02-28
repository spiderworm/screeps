
var Role = require('Role');

var upgrader = {
	role: Role.create(
		'upgrader',
		[WORK, CARRY, MOVE],
		this.upgrade.bind(this)
	),

	upgrade: function(creep) {

		console.info('upgrader');

	}
};

module.exports = upgraderRole;
