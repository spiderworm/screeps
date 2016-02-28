
var any = require('any');
var spawnUtil = require('spawnUtil');
var roomUtil = require('roomUtil');
var sourceUtil = require('sourceUtil');
var creepsUtil = require('creepsUtil');
var harvesterUtil = require('harvesterUtil');
var wandererUtil = require('wandererUtil');
var creepBoredomSystem = require('creepBoredomSystem');
var constructionSiteUtil = require('constructionSiteUtil');
var builderUtil = require('builderUtil');
var spawnSystem = require('spawnSystem');
var creepRoleUtil = require('creepRoleUtil');

var economySystem = {

    tick: function() {
        var needs = this.getNeeds();
        
        needs.sources.forEach(function(sourceNeed) {
            var unmet = 0;
            for(var i=0; i<sourceNeed.count; i++) {
                var creep = creepBoredomSystem.extractCreep(function(creep) {
                    return harvesterUtil.creepCanHaveRole(creep);
                });
                if (creep) {
                    harvesterUtil.assignRole(creep);
                    harvesterUtil.assignSource(creep, sourceNeed.source);
                } else {
                    unmet++;
                }
            }
            spawnSystem.queueUpTo(creepRoleUtil.roles.harvester, unmet);
        });
        
        creepBoredomSystem.forEach(function(creep) {
            //creep.suicide();
            if (wandererUtil.creepCanHaveRole(creep)) {
                if (harvesterUtil.creepHasRole(creep)) {
                    spawnSystem.unqueueAll(creepRoleUtil.roles.harvester);
                }
                wandererUtil.assignRole(creep);
                return;
            }
        });

        /*
        boredCreeps.forEach(function(creep) {
            if (builderUtil.creepCanHaveRole(creep)) {
                var site = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(site) {
                    builderUtil.assignRole(creep);
                    builderUtil.assignSite(creep, site);
                    return;
                }
            }
            if (wandererUtil.creepCanHaveRole(creep)) {
                wandererUtil.assignRole(creep);
                return;
            }
        });
        */
    },
    
    getNeeds: function() {
        var needs = {};
        needs.sources = [];
        roomUtil.forEach(function(room) {
            roomUtil.getSources(room).forEach(function(source) {
                var count = sourceUtil.countOpenHarvestSpaces(source);
                if (count > 0) {
                    needs.sources.push({
                        source: source,
                        count: count
                    });
                }
            });
        });
        
        return needs;
    }

};

module.exports = economySystem;
