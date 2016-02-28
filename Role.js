
function Role(name, body, tick) {
	this.name = name;
	this.body = body;
	this.tick = tick;
}

Role.create = function(name, body, tick) {
	return new Role(name, body, tick);
};

module.exports = Role;
