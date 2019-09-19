import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreators } from './store/index';

import LocationInput from '../LocationInput/LocationInput';
import LocationButton from '../LocationButton/LocationButton';
import LocationResult from '../LocationResult/LocationResult';

import { Container, Header, Message, Form } from 'semantic-ui-react';

const LocationForm = ({
  onSubmit,
  locationEntered,
  addressSuggested,
  handleInputChange,
  handleResetButtonClick,
  handleAutoComplete,
  errorCode,
  handleInputBlur
}) => {
  return (
    <Fragment>
      <Container className='app__container'>
        <Header as='h1' dividing>
          Get Lat Long Coordinates from Address
        </Header>
        <Message info className='default__message'>
          <p>
            The source code of this tool can be found{' '}
            <a href='https://github.com/alun777/react-geocode' target='_blank'>
              HERE
            </a>
            .
          </p>
        </Message>

        <Form
          onSubmit={event => onSubmit(event, locationEntered, addressSuggested)}
        >
          <div
            className='field'
            style={
              errorCode
                ? { opacity: 0.9, margin: 0 }
                : { opacity: 0, margin: 0 }
            }
          >
            <div className='ui red pointing below basic label'>
              Error:
              {(errorCode === 4000000 &&
                ' empty address has no coordinates...') ||
                (errorCode === 4000001 &&
                  ' address not valid, try something else...')}
            </div>
          </div>
          <Form.Group id='noWrap'>
            <LocationInput
              handleInputChange={handleInputChange}
              handleAutoComplete={handleAutoComplete}
              handleInputBlur={handleInputBlur}
            />
            <LocationButton handleResetButtonClick={handleResetButtonClick} />
          </Form.Group>
        </Form>
        <br />
        <LocationResult />
      </Container>
    </Fragment>
  );
};

export const mapStateToProps = state => ({
  locationEntered: state.getIn(['LocationForm', 'locationEntered']),
  addressSuggested: state.getIn(['LocationForm', 'addressSuggested']),
  errorCode: state.getIn(['LocationForm', 'errorCode'])
});

export const mapDispatchToProps = dispatch => ({
  handleInputBlur(autocompleteInput) {
    // google.maps.event.clearInstanceListeners(autocompleteInput.current);
  },
  handleInputChange(event) {
    event.persist();

    //dispatch user's own input
    dispatch(actionCreators.handleInputChangeAction(event));
  },
  handleAutoComplete(event, autocompleteInput) {
    //create Google address drop-down
    console.log(google.maps.places.Autocomplete);

    let autocomplete = new google.maps.places.Autocomplete(
      autocompleteInput.current
    );

    const handleSuggestedInput = dispatch => {
      const addressSuggested =
        autocomplete.getPlace().name +
        ', ' +
        autocomplete.getPlace().formatted_address;

      //dispatch Google suggested input
      dispatch(actionCreators.handleSuggestedInputAction(addressSuggested));
      google.maps = null;
    };

    //get the input when user selects an address from Google drop-down
    autocomplete.addListener('place_changed', () =>
      handleSuggestedInput(dispatch)
    );
  },
  onSubmit(event, locationEntered, addressSuggested) {
    event.preventDefault();

    //dispatch action to toggle loader
    dispatch(actionCreators.handleLoaderAction());

    const location = addressSuggested || locationEntered;
    dispatch(actionCreators.handleSubmitButtonAction(location));
  },
  handleResetButtonClick() {
    // dispatch action to reset all
    dispatch(actionCreators.handleResetButtonClickAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationForm);
