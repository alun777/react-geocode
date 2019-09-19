import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { Form } from 'semantic-ui-react';

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

export default LocationButton;
