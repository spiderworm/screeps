
var composer = require('composer');

var creepProcessingSystem = {
    tick: function() {
    }
};

composer.addFeature(creepProcessingSystem, 'memory', 'creepProcessingSystem');

module.exports = creepProcessingSystem;
