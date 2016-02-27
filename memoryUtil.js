
var memoryUtil = {
    get: function(space) {
        if (!Memory[space]) {
            Memory[space] = {};
        }
        return Memory[space];
    }
};

module.exports = memoryUtil;
