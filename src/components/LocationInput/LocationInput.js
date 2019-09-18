import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreators } from './store/index';

import { Input } from 'antd';

const LocationInput = ({ locationEntered, handleInputChange }) => {
  const autocompleteInput = React.createRef();
  return (
    <Fragment>
      <input
        ref={autocompleteInput}
        placeholder='Please enter location here'
        name='autocomplete'
        id='autocomplete'
        value={locationEntered}
        onChange={event => handleInputChange(event, autocompleteInput)}
      />
      <div>123</div>
    </Fragment>
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
