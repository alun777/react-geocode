import { constants } from './index';

export const handleInputChangeAction = event => ({
  type: constants.CHANGE_LOCATION_INPUT,
  event
});
