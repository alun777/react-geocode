import { constants } from './index';
import axios from 'axios';

let googleKey;

if (process.env.NODE_ENV !== 'production') {
  googleKey = process.env.REACT_APP_GOOGLE_API_KEY_DEV;
} else {
  googleKey = process.env.REACT_APP_GOOGLE_API_KEY;
}

export const handleSubmitButtonAction = (locationEntered, addressSuggested) => {
  if (!locationEntered) {
    return {
      type: constants.CHANGE_ERROR,
      errorCode: 4000000
    };
  }

  if (!addressSuggested) {
    return {
      type: constants.CHANGE_ERROR,
      errorCode: 4000002
    };
  }

  return async dispatch => {
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          addressSuggested
        )}&key=${googleKey}`
      );
      dispatch({
        type: constants.CHANGE_LOCATION_GEOCODE,
        locationLat: res.data.results[0].geometry.location.lat,
        locationLng: res.data.results[0].geometry.location.lng,
        addressSuggested
      });
    } catch (error) {
      dispatch({
        type: constants.CHANGE_ERROR,
        errorCode: 4000001
      });
    }
  };
};

export const handleInputChangeAction = event => ({
  type: constants.CHANGE_LOCATION_INPUT,
  event
});

export const handleSuggestedInputAction = addressSuggested => ({
  type: constants.CHANGE_SUGGESTED_ADDRESS,
  addressSuggested
});

export const handleResetButtonClickAction = () => ({
  type: constants.RESET_DATA
});

export const handleLoaderAction = () => ({
  type: constants.TOGGLE_LOADER
});
