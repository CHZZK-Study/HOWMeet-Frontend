import { DEFAULT_TIMOUT } from '@/constants/api';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://api.howmeet.shop:8080/',
  timeout: DEFAULT_TIMOUT,
});

axiosInstance.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    return Promise.reject(err);
  }
);
