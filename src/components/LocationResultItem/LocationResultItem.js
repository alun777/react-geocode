import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const LocationResultItem = ({ locationGeoCode, item }) => {
  return (
    <Fragment>
      {locationGeoCode.length === 1 && (
        <div className='ui blue'>Here is an example:</div>
      )}

      <div> Address => {item.address}</div>
      <div> Latitude => {item.lat}</div>
      <div> Longitude => {item.lng}</div>
      <br />
    </Fragment>
  );
};

LocationResultItem.propTypes = {};

export const mapStateToProps = state => ({
  locationGeoCode: state.getIn(['LocationForm', 'location']).toJS()
});

export default connect(
  mapStateToProps,
  null
)(LocationResultItem);
