import { fromJS } from 'immutable';
import { constants } from './index';

const defaultState = fromJS({
  locationEntered: '',
  addressSuggested: ''
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_LOCATION_INPUT:
      return state.set('locationEntered', action.event.target.value);
    case constants.CHANGE_SUGGESTED_ADDRESS:
      return state.set('addressSuggested', action.addressSuggested);

    default:
      return state;
  }
};
