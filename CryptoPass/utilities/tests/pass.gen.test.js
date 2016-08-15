let chai = require('chai')
let expect = chai.expect;
let createRandom = require('../password-utilities/pass.gen').createRandom


describe('generating random passwords', function (){

	it('should generate random passwords', function (){
		expect(createRandom(20)).to.not.be.equal(createRandom(20))
	})

	it('should generate passwords with correct number of symbols', function (){
		var random = createRandom(20, 3)
		random = random.split('').filter(elem => elem.match(/\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\-|\+|\=|\{|\[|\}|\]|\||\"|\'|\;|\:|\.|\>|\,|\<|\/|\?/))
		expect(random).to.have.length(3)
	})

	it('should generate passwords with correct number of numbers', function (){
		var random = createRandom(20, 0, 5)
		random = random.split('').filter(elem => elem.match(/[0-9]/))
		expect(random).to.have.length(5)
	})

	it('should generate passwords with correct number of numbers and symbols', function (){
		var random = createRandom(20, 8, 5)
		randomNums = random.split('').filter(elem => elem.match(/[0-9]/))
		randomSyms = random.split('').filter(elem => elem.match(/\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\-|\+|\=|\{|\[|\}|\]|\||\"|\'|\;|\:|\.|\>|\,|\<|\/|\?/))
		expect(randomNums).to.have.length(5)
		expect(randomSyms).to.have.length(8)
	})

})
