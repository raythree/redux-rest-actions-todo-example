import React from 'react';
import {Provider} from 'react-redux';
import {configureApi} from 'redux-rest-actions';
import Todos from './todos/view';

import './App.css';
import configureStore from './store';
import apiConfig from './apiConfig';

const store = configureStore();
configureApi(store, apiConfig);

if (process.env.REACT_APP_USE_MOCK_DATA) {
  const server = require('./mockServer').default;
  server();
}

function App() {
  return (
    <Provider store={store}>
      <Todos />
    </Provider>
  );
}

export default App;
