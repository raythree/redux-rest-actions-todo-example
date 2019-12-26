import {configureStore} from '@reduxjs/toolkit';
import {configureApiMiddleware} from 'redux-rest-actions';
import rootReducer from './reducer';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';

const apiMiddlewareOpts = {};

// eslint-disable-next-line
if (process.env.REACT_APP_USE_MOCK_DATA) {
  apiMiddlewareOpts.mockAdapter = MockAdapter;
  apiMiddlewareOpts.mockDelay = 500;
}
// eslint-disable-next-line
if (process.env.REACT_APP_ENABLE_MIDDLEWARE_LOGGING) {
  apiMiddlewareOpts.enableTracing = true;
}

let baseURL = '';
// eslint-disable-next-line
if (process.env.REACT_APP_BASE_URL) {
  // eslint-disable-next-line
  baseURL = process.env.REACT_APP_BASE_URL;
}

const apiMiddleware = configureApiMiddleware({baseURL}, apiMiddlewareOpts);

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [apiMiddleware, thunk],
    preloadedState
  });
  // eslint-disable-next-line
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer', () => store.replaceReducer(rootReducer));
  }
  return store;
}
