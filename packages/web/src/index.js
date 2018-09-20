import React from 'react';
import ReactDOM from 'react-dom';

import Atm from './components/Atm';

ReactDOM.render(
  <Atm />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
