
var creepNames = {
    getNext: function(base) {
        var name = base ? base + '-' : '';
        do {
            name += String.fromCharCode(Math.floor(100*Math.random()))
        } while (Game.creeps[name]);
        
        return name;
    }
};

module.exports = creepNames;
