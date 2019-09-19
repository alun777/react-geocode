import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Message } from 'semantic-ui-react';

import LocationResultItem from '../LocationResultItem/LocationResultItem';

const LocationResult = ({
  locationGeoCode,
  locationEntered,
  addressSuggested
}) => {
  return (
    <Message>
      <Message.Header>Form data:</Message.Header>

      <LocationResultItem
        addressSuggested={addressSuggested}
        locationEntered={locationEntered}
        locationGeoCode={locationGeoCode}
      ></LocationResultItem>
    </Message>
  );
};

export const mapStateToProps = state => ({
  locationGeoCode: state.getIn(['LocationForm', 'location']).toJS(),
  locationEntered: state.getIn(['LocationInput', 'locationEntered']),
  addressSuggested: state.getIn(['LocationInput', 'addressSuggested'])
});

LocationResult.propTypes = {};

export default connect(
  mapStateToProps,
  null
)(LocationResult);
