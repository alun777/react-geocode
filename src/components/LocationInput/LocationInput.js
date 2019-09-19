import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LocationInput = ({
  locationEntered,
  handleInputChange,
  errorCode,
  handleAutoComplete
}) => {
  let autocompleteInput = React.createRef();

  return (
    <Fragment>
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
          name='locationInput'
          id='locationInput'
          value={locationEntered}
          onFocus={event => handleAutoComplete(event, autocompleteInput)}
          onChange={event => handleInputChange(event, autocompleteInput)}
        />
      </div>
    </Fragment>
  );
};

export const mapStateToProps = state => ({
  locationEntered: state.getIn(['LocationForm', 'locationEntered']),
  errorCode: state.getIn(['LocationForm', 'errorCode'])
});

LocationInput.propTypes = {
  locationEntered: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  null
)(LocationInput);
