
var roomUtil = require('roomUtil');

var controllersSystem = {
	countOpenUpgradeSpaces: function(controller) {
		var x = controller.pos.x;
		var y = controller.pos.y;
		var spaces = roomUtil.getOpenSpaces(controller.room, y-1, x-1, y+1, x+1);
		return spaces.length;
	}
};

module.exports = controllersSystem;
