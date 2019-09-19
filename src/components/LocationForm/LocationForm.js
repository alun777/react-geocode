import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreators } from './store/index';

import LocationInput from '../LocationInput/LocationInput';
import LocationButton from '../LocationButton/LocationButton';
import LocationResult from '../LocationResult/LocationResult';

const LocationForm = ({ onSubmit, locationEntered }) => {
  return (
    <Fragment>
      <div>
        <form
          onSubmit={event => onSubmit(event, locationEntered)}
          className='form__container'
        >
          <div className='form2'>
            <LocationInput />
            <LocationButton />
          </div>

          <LocationResult />
        </form>
      </div>
    </Fragment>
  );
};

export const mapStateToProps = state => ({
  locationEntered: state.getIn(['LocationInput', 'locationEntered'])
});

export const mapDispatchToProps = dispatch => ({
  onSubmit(event, locationEntered) {
    event.preventDefault();

    const action = actionCreators.handleSubmitButtonAction(locationEntered);
    dispatch(action);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationForm);
