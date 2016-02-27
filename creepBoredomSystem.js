
var creepsUtil = require('creepsUtil');
var creepLogUtil = require('creepLogUtil');
var timeUtil = require('timeUtil');
var memoryUtil = require('memoryUtil');
var loopSystem = require('loopSystem');

var creepBoredomSystem = {
    _creeps: [],
    _refreshInterval: 10000,
    _memory: memoryUtil.get('boredomSystem'),
    upgrade: function() {
        if (!this._memory.creeps || Array.isArray(this._memory.creeps)) {
            this._memory.creeps = {};
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
        this._memory.creeps = {};
        creepsUtil.forEach(function(creep) {
            var logs = creepLogUtil.getLogs(creep);
            if (!logs[0] || logs[0].date <= boredDate) {
                creep.memory.bored = true;
                this._memory.creeps[creep.name] = true;
            } else {
                creep.memory.bored = false;
                delete this._memory.creeps[creep.name];
            }
        }.bind(this));
    },
    extractCreep: function(callback) {
        var creep;
        for (var name in this._memory.creeps) {
            creep = this._getCreepByName(name);
            if (creep && callback(creep)) {
                delete this._memory.creeps[name];
                return creep;
            }
        }
    },
    forEach: function(callback) {
        this.all().forEach(callback);
    },
    all: function() {
        var result = [];
        for (var name in this._memory.creeps) {
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
            delete this._memory.creeps[name];
        }
    }
};

Object.defineProperty(creepBoredomSystem, '_memory', {
    get: function() { return memoryUtil.get('boredomSystem'); }
});

module.exports = creepBoredomSystem;
