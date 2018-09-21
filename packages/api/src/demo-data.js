/*
 * Prefill some data for demo purposes.
 */

require('./dotenv');
const db = require('./db')();

// Two users, Bob and Alice, with their bank accounts.
// Bob has one account with balance 1000, whereas Alice
// has two accounts, one frozen and one with balance 10000.
const users = [
  {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@acme.com',
    accounts: [
      {
        number: '1111111111',
        pin: '0000',
        balance: 10000,
        frozen: false,
      },
    ],
  },
  {
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@acme.com',
    accounts: [
      {
        number: '2222222222',
        pin: '0000',
        balance: -30,
        frozen: true,
      },
      {
        number: '3333333333',
        pin: '0000',
        balance: 30000,
        frozen: false,
      },
    ],
  },
];

const insertData = async () => {
  try {
    for (const user of users) {
      const { id } = await db.models.users.create(user);
    
      for (const account of user.accounts) {
	    await db.models.accounts.create(Object.assign({}, account, { userId: id }));
      }
    }
  } finally {
    db.close();
  }  
};

insertData();
