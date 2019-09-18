import { fromJS } from 'immutable';
import { constants } from './index';

const defaultState = fromJS({
  location: {
    lat: null,
    lng: null
  }
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_LOCATION_GEOCODE:
      return state.mergeDeep({
        location: {
          lat: action.locationLat,
          lng: action.locationLng
        }
      });

    default:
      return state;
  }
};
