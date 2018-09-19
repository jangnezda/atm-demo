import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <div>Bona Diara, {title}</div>,
  document.getElementById('app')
);

module.hot.accept();
