var encryptFile = require('./utilities/encrypt.file.js');

var masterPassword = 'master';

var dataObj = {
			  login: [
			    {
			      name: 'Facebook',
						secondaryProp: function(){return this.username},
			      username: 'elliottmcnary@gmail.com',
			      password: 'test1234',
			      id: 1
			    },{
			      name: 'Twitter',
						secondaryProp: function(){return this.username},
			      username: 'elliottmcnary@gmail.com',
			      password: 'twitterPass',
			      id: 2
			    },{
			      name: 'Quora',
						secondaryProp: function(){return this.username},
			      username: 'elliottmcnary@gmail.com',
			      password: 'testingPass',
			      id: 3
			    },{
			      name: 'Chase',
						secondaryProp: function(){return this.username},
			      username: 'elliottmcnary@gmail.com',
			      password: '3203242Elliott',
			      id: 4
			    },{
			      name: 'Wells Fargo',
						secondaryProp: function(){return this.username},
			      username: 'elliottmcnary@gmail.com',
			      password: 'blah5302',
			      id: 5
			    },
			  ],
			  creditCard: [
			    {
			      name: 'Chase Saphire Preferred',
						secondaryProp: function(){return this.cardNumber},
			      cardNumber: '4444 3839 3020 2010',
			      ccv: '439',
			      expiration: '12/2019',
			      firstName: 'Elliott',
			      lastName: 'McNary',
			      type: 'Visa',
			      id: 1
			    },{
			      name: 'Capital One Venture',
						secondaryProp: function(){return this.cardNumber},
			      cardNumber: '4444 3239 3020 2010',
			      ccv: '342',
			      expiration: '12/2018',
			      firstName: 'Elliott',
			      lastName: 'McNary',
			      type: 'Visa',
			      id: 2
			    }
			  ],
			  identity: [
			    {
			      name: 'Social Security',
						secondaryProp: function(){return this.data.slice(0, 12) + '...'},
			      data: 'Number: 548 29 3039',
			      id: 1
			    },{
			      name: 'NSA Access Card',
						secondaryProp: function(){return this.data.slice(0, 12) + '...'},
			      data: 'Badge Number: 3402349342',
			      id: 2
			    }
			  ],
			  note: [
			    {
			      name: 'Sensitive Note',
			      data: 'Today I did something very bad and I don\'t want people to know about it.',
						secondaryProp: function(){return this.data.slice(0, 12) + '...'},
			      id: 1
			    },{
			      name: 'Dear Diary - 1/31',
			      data: 'I kissed a girl and I liked it',
						secondaryProp: function(){return this.data.slice(0, 12) + '...'},
			      id: 2
			    }
			  ]
			}
encryptFile.generateSecret(masterPassword);
encryptFile.encryptFile(dataObj, masterPassword);
