import { fromJS } from 'immutable';
import { constants } from './index';

const defaultState = fromJS({
  location: [
    {
      address: 'Google, 111 8th Ave, New York, NY 10011, USA',
      lat: '40.7414688',
      lng: '-74.0033873'
    }
  ],
  locationEntered: '',
  addressSuggested: '',
  error: null
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_LOCATION_INPUT:
      return state.set('locationEntered', action.event.target.value);

    case constants.CHANGE_SUGGESTED_ADDRESS:
      return state.set('addressSuggested', action.addressSuggested);

    case constants.CHANGE_LOCATION_GEOCODE:
      let listNum1 = state.getIn(['location']).size;
      return state
        .setIn(['location', listNum1, 'address'], action.location)
        .setIn(['location', listNum1, 'lat'], action.locationLat)
        .setIn(['location', listNum1, 'lng'], action.locationLng)
        .set('addressSuggested', '')
        .set('locationEntered', '');

    case constants.RESET_DATA:
      return defaultState;
    default:
      return state;
  }
};
