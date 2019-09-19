import React from 'react';
import PropTypes from 'prop-types';

const DefaultMessage = props => {
  return <div>{props.children}</div>;
};

DefaultMessage.propTypes = {};

export default DefaultMessage;
