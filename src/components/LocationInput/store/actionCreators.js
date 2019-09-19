import { constants } from './index';

export const handleInputChangeAction = event => ({
  type: constants.CHANGE_LOCATION_INPUT,
  event
});

export const handleSuggestedInputAction = addressSuggested => ({
  type: constants.CHANGE_SUGGESTED_ADDRESS,
  addressSuggested
});
