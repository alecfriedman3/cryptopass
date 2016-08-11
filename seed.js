var encryptFile = require('./utilities/encrypt.file.js');

var masterPassword = 'master';

var dataObj = {
  login: [
    {
      name: 'Facebook',
      username: 'elliottmcnary@gmail.com',
      password: 'test1234'
    },{
      name: 'Twitter',
      username: 'elliottmcnary@gmail.com',
      password: 'twitterPass'
    },{
      name: 'Quora',
      username: 'elliottmcnary@gmail.com',
      password: 'testingPass'
    },{
      name: 'Chase',
      username: 'elliottmcnary@gmail.com',
      password: '3203242Elliott'
    },{
      name: 'Wells Fargo',
      username: 'elliottmcnary@gmail.com',
      password: 'blah5302'
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
      type: 'Visa'
    },{
      name: 'Capital One Venture',
      cardNumber: '4444 3239 3020 2010',
      ccv: '342',
      expiration: '12/2018',
      firstName: 'Elliott',
      lastName: 'McNary',
      type: 'Visa'
    }
  ],
  identity: [
    {
      name: 'Social Security',
      data: 'Number: 548 29 3039'
    },{
      name: 'NSA Access Card',
      data: 'Badge Number: 3402349342'
    }
  ],
  note: [
    {
      name: 'Sensitive Note',
      data: 'Today I did something very bad and I don\'t want people to know about it.'
    },{
      name: 'Dear Diary - 1/31',
      data: 'I kissed a girl and I liked it'
    }
  ]
};

encryptFile.generateSecret(masterPassword);
encryptFile.encryptFile(dataObj, masterPassword);
