
var memoryUtil = require('memoryUtil');
var creepMemoryUtil = require('creepMemoryUtil');

var composer = {
	addFeature: function(obj, feature) {
		if (typeof feature === "string") {
			var args = Array.prototype.slice.call(arguments,2);
			feature = this.features[feature];
		}
		args.unshift(obj);
		feature.apply(this.features, args);
	},
	features: {
		memory: function(obj, space) {
			Object.defineProperty(obj, 'memory', {
				get: function() { return memoryUtil.get(space); }
			});
		},
		creepMemory: function(obj, space) {
			obj.memory = function(creep) {
				return creepMemoryUtil.get(creep, space);
			}
		},
		needs: function(obj) {
			obj.clearNeeds = function() { this._needs = {}; };
			obj._needs = {};
			Object.defineProperty(obj, 'needs', {
				get: function() { return obj._needs; }
			});
			obj.addNeed = function(space, need) {
				if (!obj._needs[space]) {
					obj._needs[space] = [];
				}
				obj._needs[space].push(need);
			};
		}
	}
};

module.exports = composer;
