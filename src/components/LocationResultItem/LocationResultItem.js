import React, { Fragment } from 'react';

const LocationResultItem = ({
  addressSuggested,
  locationEntered,
  locationGeoCode
}) => {
  return (
    <Fragment>
      <div> Address: {addressSuggested || locationEntered}</div>
      <div> lat: {locationGeoCode.lat}</div>
      <div> lng: {locationGeoCode.lng}</div>
    </Fragment>
  );
};

LocationResultItem.propTypes = {};

export default LocationResultItem;
