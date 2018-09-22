const express = require('express');
const bodyParser = require('body-parser');

module.exports = (db) => {
  const app = express.Router();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const findAccount = (req, res, next) => {
    const number = req.params.number;
    const pin = req.query.pin || '';

    return db.models.accounts.findByNumberAndPin(number, pin)
    .then(account => {
      if (!account) {
        return res.sendStatus(404);
      }

      Object.assign(req, { account });
      return next();
    })
    .catch(next);
  };

  const mapAccount = account => {
    const { id, number, balance, frozen, user } = account;
    const { firstName, lastName } = user;
    return {
      id,
      number,
      balance,
      frozen,
      user: { firstName, lastName },
    };
  };

  app.get('/accounts/:number', findAccount, (req, res, next) => res.send(mapAccount(req.account)));

  app.post('/accounts/:number/withdraw/:amount(\\d+)', findAccount, (req, res, next) => {
    const amount = Number(req.params.amount);
    const { account } = req;

    if (!amount || amount <= 0) {
      return res.sendStatus(400);
    }

    if (account.frozen) {
      return res.status(403).send('This account is frozen');
    }

    if (amount > account.balance) {
      return res.status(403).send('There is not enough balance in this account');
    }
    
    Object.assign(account, { balance: account.balance - amount });
    return account
      .save()
      .then(() => res.json(mapAccount(account)));
  });

  // Four arguments are required to indicate the middleware as an error handler.
  app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
  });

  return app;
};

