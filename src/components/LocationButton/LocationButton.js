import React, { Fragment } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const LocationButton = ({ handleResetButtonClick }) => {
  return (
    <Fragment>
      <Form.Button primary>Submit</Form.Button>
      <Form.Button type='button' onClick={handleResetButtonClick}>
        Reset
      </Form.Button>
    </Fragment>
  );
};

LocationButton.propTypes = {
  handleResetButtonClick: PropTypes.func.isRequired
};

export default LocationButton;
