
var creepUtil = {

    forEach: function(callback) {
        Object.keys(Game.creeps).forEach(function(key) {
            callback.call(Game.creeps[key], Game.creeps[key]);
        });
    },

    find: function(vals) {
        vals = vals || {};
        var id = Object.keys(Game.creeps).find(function(key) {
           return this._creepMatches(Game.creeps[key], vals);
        }.bind(this));
        if (id) {
            return Game.creeps[id];
        }
    },
    
    findAll: function(vals) {
        vals = vals || {};
        var matches = 
            Object.keys(Game.creeps).filter(
                function(key) {
                    return this._creepMatches(Game.creeps[key], vals);
                }.bind(this)
            ).map(
                function(key) {
                    return Game.creeps[key];
                }
            )
        ;
        return matches;
    },
    
    _creepMatches: function(creep, vals) {
        function matches(obj, vals) {
            if (obj !== vals) {
                if (typeof obj !== 'object' || typeof vals !== 'object') {
                    return false;
                }
                for (var i in vals) {
                    if (!matches(obj[i], vals[i])) {
                        return false;
                    }
                }
            }
            return true;
        }
        
        return matches(creep, vals);
    }

};

module.exports = creepUtil;
