
var composer = require('composer');
var roomUtil = require('roomUtil');
var sourceUtil = require('sourceUtil');
var harvester = require('harvester');
var upgrader = require('upgrader');
var creepRoleSystem = require('creepRoleSystem');

creepRoleSystem.addRoles(harvester.role, upgrader.role);

var economicSystem = {
    tick: function() {
    	roomUtil.forEach(function(room) {
    		roomUtil.getSources(room).forEach(function(source) {
    			var spaces = sourceUtil.countOpenHarvestSpaces(source);
    			this.addNeed('sources', {source: source, count: spaces});
    		}.bind(this));
    	}.bind(this));
    },
    assignRole: function(creep) {
    	if (creepRoleSystem.creepCanHaveRole(creep, harvester.role)) {
			if (this.needs.sources) {
				var need = this.needs.sources.find(function(need) {
					return need.count > 0;
				});
				if (need) {
					need.count--;
					creepRoleSystem.assignRole(creep, harvester.role);
					harvester.assignSource(creep, need.source);
				}
			}
		}
    }
};

composer.addFeature(economicSystem, 'memory', 'economicSystem');
composer.addFeature(economicSystem, 'needs');

module.exports = economicSystem;
