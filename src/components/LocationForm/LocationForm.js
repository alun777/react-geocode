import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreators } from './store/index';

import LocationInput from '../LocationInput/LocationInput';
import LocationButton from '../LocationButton/LocationButton';
import LocationResult from '../LocationResult/LocationResult';
import DefaultMessage from '../DefaultMessage/DefaultMessage';

import { Container, Header, Message, Form } from 'semantic-ui-react';

const LocationForm = ({
  onSubmit,
  locationEntered,
  addressSuggested,
  fn1,
  handleInputChange,
  handleResetButtonClick
}) => {
  return (
    <Fragment>
      <Container>
        <Header as='h1' dividing>
          A sample form with Semantic UI React and Redux Form
        </Header>
        <Message info>
          <DefaultMessage>
            <p>
              The source code can be found{' '}
              <a
                href='https://redux-form.com/7.4.2/docs/api/field.md/#2-a-stateless-function'
                target='_blank'
              >
                HERE
              </a>
              .
            </p>
          </DefaultMessage>
        </Message>
        <Form
          onSubmit={event => onSubmit(event, locationEntered, addressSuggested)}
        >
          <Form.Group id='noWrap'>
            <LocationInput fn1={fn1} handleInputChange={handleInputChange} />
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
  addressSuggested: state.getIn(['LocationForm', 'addressSuggested'])
});

export const mapDispatchToProps = dispatch => ({
  handleInputChange(event, autocompleteInput) {
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

    //dispatch user's own input
    dispatch(actionCreators.handleInputChangeAction(event));
  },
  onSubmit(event, locationEntered, addressSuggested) {
    event.preventDefault();

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
