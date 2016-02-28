
var composer = require('composer');

var economicSystem = {
    tick: function() {
    }
};

composer.addFeature(economicSystem, 'memory', 'economicSystem');

module.exports = economicSystem;
