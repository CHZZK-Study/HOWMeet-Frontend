import { BASE_URL, DEFAULT_TIMEOUT } from '@/constants/api';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
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
