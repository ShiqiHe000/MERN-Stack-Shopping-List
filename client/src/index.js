import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './reducer/store';
import { Provider } from 'react-redux';

import {loadUser} from './reducer/AuthSlice';

store.dispatch(loadUser());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

