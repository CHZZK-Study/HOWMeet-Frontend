import { AxiosResponse } from 'axios';
import { GetVapidRes } from '@/types/notification';
import { axiosInstance } from './instance';

export const getVapidKey = async () => {
  const result: AxiosResponse<GetVapidRes> =
    await axiosInstance.get('/fcm/vapid');
  return result.data.key;
};

export const setFcmToken = async (token: string) => {
  const result = await axiosInstance.post('/fcm/fcm-token', { token });
  return result;
};
