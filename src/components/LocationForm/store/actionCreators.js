import { constants } from './index';
import axios from 'axios';

// export const handleSubmitButtonAction = () => ({
//   type: constants.GET_LOCATION_GEOCODE,
//   event
// });

let googleKey;
if (process.env.NODE_ENV !== 'production') {
  googleKey = process.env.REACT_APP_GOOGLE_API_KEY_DEV;
} else {
  googleKey = process.env.REACT_APP_GOOGLE_API_KEY;
}

export const handleSubmitButtonAction = location => {
  return async dispatch => {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=${googleKey}`
    );

    dispatch({
      type: constants.CHANGE_LOCATION_GEOCODE,
      locationLat: res.data.results[0].geometry.location.lat,
      locationLng: res.data.results[0].geometry.location.lng
    });
  };
};
