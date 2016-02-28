
var composer = require('composer');

var defenseSystem = {
    tick: function() {
    }
};

composer.addFeature(defenseSystem, 'memory', 'defenseSystem');

module.exports = defenseSystem;
