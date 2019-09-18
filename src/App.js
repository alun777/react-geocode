import React, { Fragment } from 'react';
import LocationForm from './components/LocationForm/LocationForm';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/index';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <LocationForm />
    </Fragment>
  </Provider>
);

export default App;
