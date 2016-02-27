
var roomUtil = require('roomUtil');

var sourceUtil = {
    _sources: {},
    getById: function(id) {
        if (!this._sources[id]) {
            this.refresh();
        }
        return this._sources[id];
    },
    refresh: function(id) {
        roomUtil.forEach(function(room) {
            roomUtil.getSources(room).forEach(function(source) {
                this._sources[source.id] = source;
            }.bind(this));
        }.bind(this));
    },
    countOpenHarvestSpaces: function(source) {
        var x = source.pos.x;
        var y = source.pos.y;
        var spaces = roomUtil.getOpenSpaces(source.room, y-1, x-1, y+1, x+1);
        return spaces.length;
    }
};

module.exports = sourceUtil;
