
var spawnUtil = {
    
    forEach: function(callback) {
        Object.keys(Game.spawns).forEach(function(key) {
            callback.call(Game.spawns[key], Game.spawns[key]);
        });
    },
    
    getRooms: function() {
        var rooms = [];
        this.forEach(function(spawn) {
            if (rooms.indexOf(spawn.room) === -1) {
                rooms.push(spawn.room);
            }
        });
        return rooms;
    }

};

module.exports = spawnUtil;
