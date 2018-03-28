import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux';
import './index.css';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

ReactDOM.render(
  <Provider store={ store } >
  <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
