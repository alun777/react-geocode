import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store/index';
import { Container, Header, Message, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import LocationInput from '../LocationInput/LocationInput';
import LocationButton from '../LocationButton/LocationButton';
import LocationResult from '../LocationResult/LocationResult';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const LocationForm = ({
  onSubmit,
  locationEntered,
  addressSuggested,
  handleInputChange,
  handleResetButtonClick,
  handleAutoComplete,
  errorCode
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
          <ErrorMessage errorCode={errorCode} />
          <Form.Group id='noWrap'>
            <LocationInput
              handleInputChange={handleInputChange}
              handleAutoComplete={handleAutoComplete}
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
  handleInputChange(event) {
    event.persist();

    //dispatch user's own input
    dispatch(actionCreators.handleInputChangeAction(event));
  },
  handleAutoComplete(autocompleteInput) {
    //create Google address drop-down
    let autocomplete;
    if (google.maps) {
      autocomplete = new google.maps.places.Autocomplete(
        autocompleteInput.current
      );
      autocomplete.addListener('place_changed', () =>
        handleSuggestedInput(dispatch)
      );
    }

    const handleSuggestedInput = dispatch => {
      //get selected address from drop-down
      const addressSuggested =
        autocomplete.getPlace().name +
        ', ' +
        autocomplete.getPlace().formatted_address;

      //dispatch Google suggested input
      dispatch(actionCreators.handleSuggestedInputAction(addressSuggested));

      //avoid generating many Google Autocomplete service
      google.maps = null;
    };
  },
  onSubmit(event, locationEntered, addressSuggested) {
    event.preventDefault();

    //dispatch action to toggle loader
    dispatch(actionCreators.handleLoaderAction());

    //dispatch input result
    dispatch(
      actionCreators.handleSubmitButtonAction(locationEntered, addressSuggested)
    );
  },
  handleResetButtonClick() {
    // dispatch action to reset all
    dispatch(actionCreators.handleResetButtonClickAction());
  }
});

LocationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  locationEntered: PropTypes.string.isRequired,
  addressSuggested: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleResetButtonClick: PropTypes.func.isRequired,
  handleAutoComplete: PropTypes.func.isRequired,
  errorCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationForm);
