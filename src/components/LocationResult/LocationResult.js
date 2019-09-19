import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Message } from 'semantic-ui-react';

import LocationResultItem from '../LocationResultItem/LocationResultItem';

const LocationResult = ({ locationGeoCode }) => {
  //do not show default location if user has an input
  if (locationGeoCode.length > 1) {
    locationGeoCode.splice(0, 1);
  }

  return (
    <Message>
      <Message.Header>Result:</Message.Header>
      <br />

      {locationGeoCode.map((item, index) => {
        return (
          <LocationResultItem key={index} item={item}></LocationResultItem>
        );
      })}
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
