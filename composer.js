
var memoryUtil = require('memoryUtil');

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
        }
    }
};

module.exports = composer;
