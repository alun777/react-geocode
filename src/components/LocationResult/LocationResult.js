import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Message } from 'semantic-ui-react';

const LocationResult = ({ locationGeoCode }) => {
  return (
    <Message>
      <Message.Header>Form data:</Message.Header>
      <div> lat: {locationGeoCode.lat}</div>
      <div> lng: {locationGeoCode.lng}</div>
    </Message>
  );
};

export const mapStateToProps = state => ({
  locationGeoCode: state.getIn(['LocationForm', 'location']).toJS()
});

LocationResult.propTypes = {};

export default connect(
  mapStateToProps,
  null
)(LocationResult);
