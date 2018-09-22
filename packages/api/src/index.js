const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const session = require('express-session');
const bodyParser = require('body-parser');

require('./dotenv');

const api = require('./api');
const db = require('./db')();

const { NODE_ENV, PORT, COOKIE_SECRET } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', true);

app.use(session({
  secret: COOKIE_SECRET,
  cookie: {}
}));

app.use(helmet({
  frameguard: { action: 'sameorigin' },
  hsts: {
    maxAge: 10886400,
    includeSubDomains: true,
    preload: true,
  }
}));
app.use(compression());

const rootPath = path.resolve('../web');

app.use(express.static(path.resolve(rootPath, 'dist')));

// Register api endpoints
app.use('/api', api(db));

// Every other path handled by frontend
app.use('*', (req, res) => {
  res.sendFile(path.join(rootPath, 'dist', 'index.html'));
});

if (require.main === module) {
  const port = PORT || 3001;

  app.listen(port, (error) => {
    if (!error) {
      console.log(`Running in ${NODE_ENV} mode`);
      console.log(`Server started and listening on port ${port}`);
    }
  });
}

module.exports = app;
