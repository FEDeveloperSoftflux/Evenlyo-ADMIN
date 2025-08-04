import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { icons } from '../assets';
import { apiHeaders, unauthorizePopup } from '../constants/index';

export let baseUrl = 'https://dubidorzapi.devmngt.com/api/v1/';
// export let baseUrl =
//   'https://6f09-2400-adc1-4b0-bd00-f94f-d613-451e-7d1b.ngrok-free.app/api/v1/';

const api = async (path, params, method, formData) => {
  let userToken = await AsyncStorage.getItem('token');
  userToken = JSON.parse(userToken);

  console.log(userToken, 'userTokenuserTokenuserTokenuserToken');
  let options = {
    headers: {
      'Content-Type': apiHeaders.application_json,
      ...(userToken !== null && {
        Authorization: `Bearer ${userToken}`,
      }),
    },
    method: method,
    ...(params && { data: formData ? params : JSON.stringify(params) }),
  };

  console.log(baseUrl + path, options, 'options');
  return axios(baseUrl + path, options)
    .then(response => {
      return response;
    })
    .catch(async error => {
      if (error?.status == 401) {
        unauthorizePopup.current.isVisible({
          headings: 'Session Expired',
          message: error.response.data.message,
          iconss: icons.redcross,
        });
        return;
      }
      return error.response;
    });
};

export default api;
