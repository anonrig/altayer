import axios from 'axios';
import * as apiConstants from '../constants/api';
import Promise from 'bluebird';


const cancelToken = axios.CancelToken;

const api = axios.create({
  baseURL: apiConstants.API_URL,
  timeout: 30000,
  responseType: 'json'
});

let pendingRequests = [];


api.search = (keyword) => {
  const token = cancelToken.source().token;

  pendingRequests.push(token);
  let config = {
    method: 'get',
    url: `${apiConstants.API_URL}/products?keyword=${keyword}`,
    cancelToken: token
  };

  return axios(config)
    .then((response) => {
      return response.data;
    });
};


api.killAll = () => {
  return Promise.all(pendingRequests);
};

export default api;