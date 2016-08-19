let chai = require('chai')
let expect = chai.expect;
let compareAndMerge = require('../object.compare').compareAndMerge;
let compareAndDelete = require('../object.compare').compareAndDelete;
let moment = require('moment')

describe('Object Compare utility\'s', function (){

  describe('compare function', function (){
    var merge, base, deletioneer, mergeAndDeletioneer;
    beforeEach('encrypt data', function (done){
      this.timeout(6000)
      base = {
        login: [
          {
            name: 'Facebook',
            username: 'elliottmcnary@gmail.com',
            password: 'test1234',
            id: 1,
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a')
          },{
            name: 'Twitter',
            username: 'elliottmcnary@gmail.com',
            password: 'twitterPass',
            id: 2,
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a')
          },
          {
            name: 'Google',
            username: 'elliottmcnary@gmail.com',
            password: 'googlepasword',
            id: 3,
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a')
          }
        ],
        creditCard: [
          {
            name: 'Chase Saphire Preferred',
            cardNumber: '4444 3839 3020 2010',
            ccv: '439',
            expiration: '12/2019',
            firstName: 'Elliott',
            lastName: 'McNary',
            type: 'Visa',
            id: 1,
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a')
          },{
            name: 'Capital One Venture',
            cardNumber: '4444 3239 3020 2010',
            ccv: '342',
            expiration: '12/2018',
            firstName: 'Elliott',
            lastName: 'McNary',
            type: 'Visa',
            id: 2,
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a')
          }
        ]
      }
      deletioneer = JSON.parse(JSON.stringify(base))
      deletioneer.login.pop()
      merge = JSON.parse(JSON.stringify(base))
      setTimeout(function (){
        merge.creditCard[1].type = 'Mastercard'
        merge.creditCard[1].lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a')
        merge.login.push({
            name: 'Quora',
            username: 'elliottmcnary@gmail.com',
            password: 'testingPass',
            id: 4,
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            lastUpdated: moment().format('MMMM Do YYYY, h:mm:ss a')
          })
        merge.login[2].deleted = true
        merge.login[2].lastUpdated = moment().format('MMMM Do YYYY, h:mm:ss a')
        mergeAndDeletioneer = JSON.parse(JSON.stringify(merge));
        mergeAndDeletioneer.login.filter(obj => !obj.deleted)
        done()
      }, 5000)
    })

    it('should compare two objects, adding new things and updating changed things', function (){
      expect(compareAndMerge(merge, base)).to.deep.equal(merge)
    })
    it('should compare two objects, deleting deleted items on the merge', function (){
      var check = compareAndDelete(merge, base)
      expect(check).to.deep.equal(deletioneer)
    })
    it('should compare two objects, updating and deleting', function (){
      expect(compareAndDelete(merge, compareAndMerge(merge, base))).to.deep.equal(mergeAndDeletioneer)
    })
  })

})
