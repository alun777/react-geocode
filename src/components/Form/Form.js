import React, { Fragment } from 'react';
import LocationInput from '../LocationInput/LocationInput';

const Form = () => {
  return (
    <Fragment>
      <div className='form__container'>
        <LocationInput />
        <div className='search-result-list'>Search Result List</div>
      </div>
    </Fragment>
  );
};

export default Form;
