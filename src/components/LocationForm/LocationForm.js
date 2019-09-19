import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreators } from './store/index';

import LocationInput from '../LocationInput/LocationInput';
import LocationButton from '../LocationButton/LocationButton';
import LocationResult from '../LocationResult/LocationResult';

import { Container, Divider, Header, Message, Form } from 'semantic-ui-react';

const LocationForm = ({ onSubmit, locationEntered }) => {
  return (
    <Fragment>
      <Container>
        <Header as='h1' dividing>
          A sample form with Semantic UI React and Redux Form
        </Header>
        <Message info>
          <p>
            You will don't need any special mappings for <code>Form.Input</code>
            , because it passed events from native inputs.
          </p>

          <p>
            The situation with other components is more complicated, because the{' '}
            <code>Field</code> relies on the native events. However, it can be
            easily with{' '}
            <a
              href='https://redux-form.com/7.4.2/docs/api/field.md/#2-a-stateless-function'
              target='_blank'
            >
              stateless function
            </a>
            . We recomend to wrap them with generic components to reduce forms
            complexivity.
          </p>
        </Message>
        <Form onSubmit={event => onSubmit(event, locationEntered)}>
          <Form.Group id='noWrap'>
            <LocationInput />
            <LocationButton />
          </Form.Group>
        </Form>
        <LocationResult />
      </Container>
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
