import axios from 'axios';
import Cache from '../utils/Cache';
// import apisauce from 'apisauce';
import {STAGING_URL, PROD_URL} from '@env';

const client = axios.create({
  baseURL: PROD_URL,
  // baseURL: STAGING_URL,

  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

client.interceptors.request.use(
  async config => {
    const token = (await Cache.getString('@token')) || '';
    // console.log(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

// client.interceptors.request.use(
//   config => {
//     const token = localStorage?.getItem('token') || '';

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     // config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   error => {
//     Promise.reject(error);
//   },
// );

export default client;
