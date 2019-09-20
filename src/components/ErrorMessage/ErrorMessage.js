import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ errorCode }) => {
  return (
    <div
      className='field'
      style={
        errorCode ? { opacity: 0.9, margin: 0 } : { opacity: 0, margin: 0 }
      }
    >
      <div className='ui red pointing below basic label'>
        Error:
        {(errorCode === 4000000 && ' empty address has no coordinates...') ||
          (errorCode === 4000001 &&
            ' address not valid, try something else...') ||
          (errorCode === 4000002 &&
            ' please select from drop-down list to get the most accurate coordinates ')}
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  errorCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
};

export default ErrorMessage;
