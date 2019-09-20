import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

export const mapStateToProps = state => ({
  locationGeoCode: state.getIn(['LocationForm', 'location']).toJS()
});

LocationResultItem.propTypes = {
  locationGeoCode: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  null
)(LocationResultItem);
