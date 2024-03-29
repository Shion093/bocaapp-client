import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
import { ConnectedRouter } from 'connected-react-router'
import registerServiceWorker from './registerServiceWorker';

import store, { history } from './store';
import App from './App';

import 'typeface-roboto';
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
