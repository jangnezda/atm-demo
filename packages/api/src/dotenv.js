if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');

  dotenv.config({
    path: process.env.npm_package_config_dotenv_path,
  });
}
