
var composer = require('composer');
var roomUtil = require('roomUtil');
var sourceUtil = require('sourceUtil');
var harvester = require('harvester');
var upgrader = require('upgrader');
var creepRoleSystem = require('creepRoleSystem');

creepRoleSystem.addRoles(harveseter.role, upgrader.role);

var economicSystem = {
    tick: function() {
    	roomUtil.forEach(function(room) {
    		roomUtil.getSources(room).forEach(function(source) {
    			var spaces = sourceUtil.countOpenHarvestSpaces(source);
    			this.addNeed('source', {source: source, count: spaces});
    		}.bind(this));
    	}.bind(this));
    }
};

composer.addFeature(economicSystem, 'memory', 'economicSystem');
composer.addFeature(economicSystem, 'needs');

module.exports = economicSystem;
