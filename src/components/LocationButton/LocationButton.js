import React, { Fragment } from 'react';

import { Form } from 'semantic-ui-react';

const LocationButton = () => {
  return (
    <Fragment>
      <Form.Button primary>Submit</Form.Button>
      <Form.Button>Reset</Form.Button>
    </Fragment>
  );
};

export default LocationButton;
