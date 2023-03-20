import axios from 'axios';
import Cache from '../utils/Cache';
// import apisauce from 'apisauce';

const client = axios.create({
  baseURL: 'https://staging.moosbu.com',

  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

client.interceptors.request.use(
  async config => {
    const token = (await Cache.getString('@token')) || '';

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
