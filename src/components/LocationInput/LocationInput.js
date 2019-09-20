import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LocationInput = ({
  locationEntered,
  handleInputChange,
  handleAutoComplete,
  errorCode
}) => {
  let autocompleteInput = React.createRef();

  return (
    <div
      className={
        errorCode
          ? 'ui input field eight wide error'
          : 'ui input field eight wide'
      }
    >
      <input
        type='text'
        ref={autocompleteInput}
        placeholder='Please enter location here'
        name='autocomplete'
        id='autocomplete'
        value={locationEntered}
        onFocus={() => handleAutoComplete(autocompleteInput)}
        onChange={event => handleInputChange(event)}
      />
    </div>
  );
};

export const mapStateToProps = state => ({
  locationEntered: state.getIn(['LocationForm', 'locationEntered']),
  errorCode: state.getIn(['LocationForm', 'errorCode'])
});

LocationInput.propTypes = {
  locationEntered: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleAutoComplete: PropTypes.func.isRequired,
  errorCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
};

export default connect(
  mapStateToProps,
  null
)(LocationInput);
