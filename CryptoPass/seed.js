var encryptFile = require('./utilities/encrypt.file.js');

var masterPassword = 'master';

var dataObj = {
			  login: [
			    {
			      name: 'Facebook',
			      username: 'elliottmcnary@gmail.com',
			      password: 'test1234',
			      id: 1
			    },{
			      name: 'Twitter',
			      username: 'elliottmcnary@gmail.com',
			      password: 'twitterPass',
			      id: 2
			    },{
			      name: 'Quora',
			      username: 'elliottmcnary@gmail.com',
			      password: 'testingPass',
			      id: 3
			    },{
			      name: 'Chase',
			      username: 'elliottmcnary@gmail.com',
			      password: '3203242Elliott',
			      id: 4
			    },{
			      name: 'Wells Fargo',
			      username: 'elliottmcnary@gmail.com',
			      password: 'blah5302',
			      id: 5
			    },
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
			      id: 1
			    },{
			      name: 'Capital One Venture',
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
			      data: 'Number: 548 29 3039',
			      id: 1
			    },{
			      name: 'NSA Access Card',
			      data: 'Badge Number: 3402349342',
			      id: 2
			    }
			  ],
			  note: [
			    {
			      name: 'Sensitive Note',
			      data: 'Today I did something very bad and I don\'t want people to know about it.',
			      id: 1
			    },{
			      name: 'Dear Diary - 1/31',
			      data: 'I kissed a girl and I liked it',
			      id: 2
			    }
			  ]
			}
encryptFile.generateSecret(masterPassword);
encryptFile.encryptFile(dataObj, masterPassword);
