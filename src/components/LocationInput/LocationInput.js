import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreators } from './store/index';

import { Form } from 'semantic-ui-react';

const LocationInput = ({ locationEntered, handleInputChange }) => {
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
        onChange={event => handleInputChange(event, autocompleteInput)}
      />
    </div>
  );
};

export const mapStateToProps = state => ({
  locationEntered: state.getIn(['LocationInput', 'locationEntered'])
});

export const mapDispatchToProps = dispatch => ({
  handleInputChange(event, autocompleteInput) {
    event.persist();

    let autocomplete = new google.maps.places.Autocomplete(
      autocompleteInput.current
    );

    const action = actionCreators.handleInputChangeAction(event);
    dispatch(action);
  }
});

LocationInput.propTypes = {
  locationEntered: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationInput);
