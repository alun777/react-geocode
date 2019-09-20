import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

import LocationResultItem from '../LocationResultItem/LocationResultItem';

const LocationResult = ({ locationGeoCode, loader, errorCode }) => {
  //do not show default location if user has an input
  if (locationGeoCode.length > 1) {
    locationGeoCode.splice(0, 1);
  }

  return (
    <Message>
      <Message.Header>
        Result: &nbsp;
        {loader && !errorCode && (
          <div className='ui active inline loader small'></div>
        )}
      </Message.Header>
      <br />
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
  locationGeoCode: state.getIn(['LocationForm', 'location']).toJS(),
  loader: state.getIn(['LocationForm', 'loader']),
  errorCode: state.getIn(['LocationForm', 'errorCode'])
});

LocationResult.propTypes = {
  locationGeoCode: PropTypes.array.isRequired,
  loader: PropTypes.bool.isRequired,
  errorCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
};

export default connect(
  mapStateToProps,
  null
)(LocationResult);
