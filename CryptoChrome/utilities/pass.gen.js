var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());

module.exports = {
	createRandom: function (length, symTotal, numTotal){
		if (symTotal + numTotal > length) return
		var chars = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ"
		var syms = "!@#$%^&*()_-+={[}]|\"';:.>,</?"
		var nums = "0123456789"
		var pass = new Array(length).fill('');
		while (symTotal > 0){
			var ind = random.integer(0, length)
			if (!pass[ind]){
				pass[ind] = syms[random.integer(0, syms.length - 1)]
				symTotal --
			}
		}
		while (numTotal > 0){
			var ind = random.integer(0, length)
			if (!pass[ind] && pass[ind] !== 0){
				pass[ind] = nums[random.integer(0, nums.length - 1)]
				numTotal --
			}
		}
		return pass.map(char => char && char !== 0? char : chars[random.integer(0, chars.length - 1)]).join('')
	}
}
