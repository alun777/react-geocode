import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreators } from './store/index';
import { Input } from 'antd';

const LocationInput = ({ locationEntered, handleInputChange }) => {
  return (
    <Fragment>
      <Input
        placeholder='Please enter location here'
        name='location'
        id='location'
        value={locationEntered}
        onChange={event => handleInputChange(event)}
      />
      <button>submit</button>
    </Fragment>
  );
};

export const mapStateToProps = state => ({
  locationEntered: state.getIn(['LocationInput', 'locationEntered'])
});

export const mapDispatchToProps = dispatch => ({
  handleInputChange(event) {
    const action = actionCreators.handleInputChangeAction(event);
    dispatch(action);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationInput);
