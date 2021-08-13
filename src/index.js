import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import { Provider } from 'react-redux';
import { storeFactory} from "./store";

const store = storeFactory(); // You can also pass in an initialState here

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>
    ,
  document.getElementById('root')
);
