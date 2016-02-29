
var any = {
	of: function(obj) {
		if (Array.isArray(obj)) {
			return this.ofArray(obj);
		}
	},
	ofArray: function(arr) {
		return arr[Math.floor(arr.length * Math.random())];
	}
};

module.exports = any;
