/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import BoardsApi from 'core/api/BoardsApi';
import AuthApi from 'core/rest/AuthApi';
import store from 'store';

import App from './App';

// const xex = async (): Promise<void> => {
//   // await AuthApi.signIn({ login: 'Ilo7776', password: 'qwerty123' });
//   await BoardsApi.getAllBoards();
// };

// xex();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);
