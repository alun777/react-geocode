import React, { Fragment } from 'react';
import Form from './components/Form/Form';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/index';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <Form />
    </Fragment>
  </Provider>
);

export default App;
