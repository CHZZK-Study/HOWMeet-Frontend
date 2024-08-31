import {
  LoginReq,
  LoginRes,
  SocialLoginReq,
  SocialLoginRes,
} from '@/models/user.model';
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
      // TODO: 비속어 예외처리
      window.alert('닉네임은 비속어를 포함할 수 없습니다.');
    }
    window.alert('다시 시도해주세요.');
  }
};

export const socialLogin = async (req: SocialLoginReq) => {
  const result: AxiosResponse<SocialLoginRes> = await axiosInstance.post(
    '/oauth/login',
    req
  );
  return result;
};
