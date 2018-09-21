import React from 'react';
import ReactDOM from 'react-dom';

import cash from './cash';
import { api } from './api';
import Atm from './components/Atm';

ReactDOM.render(
  <Atm api={api} cash={cash} />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
