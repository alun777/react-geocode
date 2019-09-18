import { combineReducers } from 'redux-immutable';
import { reducer as LocationInput } from '../components/LocationInput/store/index';
import { reducer as LocationForm } from '../components/LocationForm/store/index';

export default combineReducers({
  LocationInput,
  LocationForm
});
