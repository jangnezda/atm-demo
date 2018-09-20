import React from 'react';
import ReactDOM from 'react-dom';

import { api } from './api';
import Atm from './components/Atm';

ReactDOM.render(
  <Atm api={api} />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
