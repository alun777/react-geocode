import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import store from './store/index';

import LocationForm from './components/LocationForm/LocationForm';

import './App.css';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <LocationForm />
    </Fragment>
  </Provider>
);

export default App;
