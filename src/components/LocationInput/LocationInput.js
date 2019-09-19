import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LocationInput = ({ locationEntered, handleInputChange, fn1 }) => {
  let autocompleteInput = React.createRef();
  return (
    <div className='ui input field eight wide'>
      <input
        type='text'
        ref={autocompleteInput}
        placeholder='Please enter location here'
        name='locationInput'
        id='locationInput'
        value={locationEntered}
        onChange={event => handleInputChange(event, autocompleteInput, fn1)}
      />
    </div>
  );
};

export const mapStateToProps = state => ({
  locationEntered: state.getIn(['LocationForm', 'locationEntered'])
});

LocationInput.propTypes = {
  locationEntered: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  null
)(LocationInput);
