import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import store from './app/store';
import { setRequestError } from './components/notes/noteSlice';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import axios from './lib/axios';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// https://stackoverflow.com/a/52947618
const { dispatch } = store;

axios.interceptors.response.use((response) => {
  return response;
}, (error) => { return handleErrorResponse(error); });

const handleErrorResponse = (e) => {
  const { status } = e.response;
  switch(status) {
    case 401: window.location.replace(
      `${process.env.REACT_APP_API_ROOT}/auth/google`
      );
      break
    case 403: dispatch(setRequestError(403))
      break
    case 404: window.location.replace(
      `${process.env.REACT_APP_CLIENT_ROOT}/404`
      );
      break
    case 422: dispatch(setRequestError(422));
      break
    default: dispatch(setRequestError(e.response.status));
  }
  return Promise.reject(e);
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
