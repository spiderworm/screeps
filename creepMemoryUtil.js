
var creepMemoryUtil = {
    get: function(creep, space) {
        if (!creep.memory[space]) {
            creep.memory[space] = {};
        }
        return creep.memory[space];
    }
};

module.exports = creepMemoryUtil;
