
var composer = require('composer');
var creepsUtil = require('creepsUtil');
var creepLogUtil = require('creepLogUtil');
var timeUtil = require('timeUtil');
var memoryUtil = require('memoryUtil');
var loopSystem = require('loopSystem');

var creepBoredomSystem = {
    _creeps: [],
    _refreshInterval: 10000,
    upgrade: function() {
        if (!this.memory.creeps || Array.isArray(this.memory.creeps)) {
            this.memory.creeps = {};
        }
    },
    tick: function() {
        loopSystem.addLoop(
            'creep boredom refresh',
            this.refresh.bind(this),
            this._refreshInterval
        );
    },
    refresh: function() {
        var boredDate = (new Date()).getTime() - 5000;
        this.memory.creeps = {};
        creepsUtil.forEach(function(creep) {
            var logs = creepLogUtil.getLogs(creep);
            if (!logs[0] || logs[0].date <= boredDate) {
                creep.memory.bored = true;
                this.memory.creeps[creep.name] = true;
            } else {
                creep.memory.bored = false;
                delete this.memory.creeps[creep.name];
            }
        }.bind(this));
    },
    extractCreep: function(callback) {
        var creep;
        for (var name in this.memory.creeps) {
            creep = this._getCreepByName(name);
            if (creep && callback(creep)) {
                delete this.memory.creeps[name];
                return creep;
            }
        }
    },
    forEach: function(callback) {
        this.all().forEach(callback);
    },
    all: function() {
        var result = [];
        for (var name in this.memory.creeps) {
            var creep = this._getCreepByName(name);
            if (creep) {
                result.push(Game.creeps[name]);
            }
        }
        return result;
    },
    _getCreepByName: function(name) {
        if (Game.creeps[name]) {
            return Game.creeps[name];
        } else {
            delete this.memory.creeps[name];
        }
    }
};

composer.addFeature(creepBoredomSystem, 'memory', 'boredomSystem');

module.exports = creepBoredomSystem;
