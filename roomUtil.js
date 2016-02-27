
var roomUtil = {

    getSources: function(room) {
        return room.find(FIND_SOURCES);
    },
    
    forEach: function(callback) {
        Object.keys(Game.rooms).forEach(function(key) {
            callback.call(Game.rooms[key], Game.rooms[key]);
        });
    },
    
    getOpenSpaces(room, top, left, bottom, right) {
        var spaces = room.lookAtArea(top, left, bottom, right);
        var result = [];

        for (var x = left; x <= right; x++) {
            for (var y = top; y <= bottom; y++) {
                if (
                    !spaces[y][x].find(function(feature) {
                        return feature.type !== 'terrain' || feature.terrain !== 'plain'
                    })
                ) {
                    result.push(room.getPositionAt(x, y));
                }
            }
        }
        return result;
    }
};

module.exports = roomUtil;
