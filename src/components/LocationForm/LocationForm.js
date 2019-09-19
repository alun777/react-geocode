import React, { Fragment } from 'react';
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
            <a
              href='https://redux-form.com/7.4.2/docs/api/field.md/#2-a-stateless-function'
              target='_blank'
            >
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
            />
            <LocationButton handleResetButtonClick={handleResetButtonClick} />
          </Form.Group>
        </Form>
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
  handleAutoComplete(event, autocompleteInput) {
    event.persist();

    //create Google address drop-down
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
