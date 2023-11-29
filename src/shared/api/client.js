import axios from 'axios';
import Cache from '../utils/Cache';
// import apisauce from 'apisauce';
import {PROD_URL} from '@env';

// const baseURL = 'https://app.moosbu.com';
const baseURL = 'https://staging.moosbu.com';

const client = axios.create({
  // baseURL: PROD_URL,
  // baseURL: STAGING_URL,
  // baseURL: 'https://app.moosbu.com',
  baseURL,

  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000 * 60,
});

client.interceptors.request.use(
  async config => {
    const token = (await Cache.getString('@token')) || '';
    console.log(token, baseURL);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export default client;
