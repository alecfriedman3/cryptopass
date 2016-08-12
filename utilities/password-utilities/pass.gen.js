var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());
var value = random.integer(1, 100)


module.exports = {
	createRandom: function (length, symTotal, numTotal){
		var chars = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ"
		var syms = "!@#$%^&*()_-+={[}]|\"';:.>,</?"
		var nums = "0123456789"
		var pass = new Array(length);
		while (symTotal > 0 && pass.length !== length){
			var ind = random.integer(0, length)
			if (!pass[ind]){
				pass[ind] = syms[random.integer(0, syms.length - 1)]
				symTotal --
			}
		}
		while (numTotal > 0 && pass.length !== length){
			var ind = random.integer(0, length)
			if (!pass[ind]){
				pass[ind] = nums[random.integer(0, nums.length - 1)]
				numTotal --
			}
		}
		return pass.fill(0).map(char => char ? char : chars[random.integer(0, chars.length - 1)]).join('')
	}
}
