import axios from 'axios';
import * as apiConstants from '../constants/api';


export function search(keyword) {
  let config = {
    method: 'get',
    url: `${apiConstants.API_URL}/search`
  };

  return axios(config);
};


export function killAll() {

};