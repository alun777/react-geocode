import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LocationResult = ({ locationGeoCode }) => {
  return (
    <div>
      <div className='search-result-list'>Search Result List</div>
      <div> lat: {locationGeoCode.lat}</div>
      <div> lng: {locationGeoCode.lng}</div>
    </div>
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
