let chai = require('chai')
let expect = chai.expect;
let createRandom = require('../password-utilities/pass.gen').createRandom


describe('generating random passwords', function (){

	it('should generate random passwords', function (){
		expect(createRandom(20)).to.not.be.equal(createRandom(20))
	})

	it('should generate passwords with correct number of symbols', function (){
		expect(createRandom(20, 3).split().filter(elem => elem.match(new RegExp("!@#$%^&*()_-+={[}]|\"';:.>,</?")))).to.have.length(3)
	})

})
