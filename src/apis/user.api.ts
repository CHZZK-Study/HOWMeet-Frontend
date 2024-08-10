import { LoginReq, LoginRes } from '@/models/user.model';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from './instance';

export const login = async (req: LoginReq) => {
  try {
    const result: AxiosResponse<LoginRes> = await axiosInstance.post(
      '/mock/login',
      req
    );
    return result;
  } catch (err) {
    if (err instanceof AxiosError && err.status === 400) {
      return false;
    }
    window.alert('다시 시도해주세요.');
  }
};
