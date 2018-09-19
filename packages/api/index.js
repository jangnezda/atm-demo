const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production') {
  // Load env variables from '.env' file.
  // In production, we expect that environment is set up externally.
  const dotenv = require('dotenv');

  dotenv.config({
    path: process.env.npm_package_config_dotenv_path,
  });
}

const { NODE_ENV, PORT, COOKIE_DOMAIN } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('trust proxy', true);

const cookieOptions = {
  secure: (NODE_ENV === 'production'),
};

if (NODE_ENV === 'production') {
  Object.assign(cookieOptions, { domain: COOKIE_DOMAIN });
}

app.use(helmet({
  frameguard: { action: 'sameorigin' },
  hsts: {
    maxAge: 10886400,
    includeSubDomains: true,
    preload: true,
  },
}));
app.use(compression());

const rootPath = '.';

app.use('/static', express.static(path.resolve(rootPath, 'public', 'static')));

app.use(express.static(path.resolve(rootPath, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(rootPath, 'dist', 'index.html'));
});

// Pass API app as middleware
// app.use('/api', webApi(dependencies));

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
