
var composer = require('composer');

var attackSystem = {
	tick: function() {
	}
};

composer.addFeature(attackSystem, 'memory', 'attackSystem');

module.exports = attackSystem;
