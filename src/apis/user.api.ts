import {
  GetSocialLoginUrlRes,
  GetUserProfileRes,
  LoginReq,
  LoginRes,
  SocialLoginReq,
  SocialLoginRes,
} from '@/models/user.model';
import { ProviderName } from '@/types/auth';
import { AxiosResponse } from 'axios';
import { axiosInstance } from './instance';

export const login = async (req: LoginReq) => {
  const result: AxiosResponse<LoginRes> = await axiosInstance.post(
    '/auth/login',
    req
  );
  return result;
};

export const getSocialLoginUrl = async (providerName: ProviderName) => {
  const result: AxiosResponse<GetSocialLoginUrlRes> = await axiosInstance.get(
    '/oauth/authorize',
    {
      params: {
        providerName,
      },
    }
  );
  return result;
};

export const socialLogin = async (req: SocialLoginReq) => {
  const result: AxiosResponse<SocialLoginRes> = await axiosInstance.post(
    '/oauth/login',
    req
  );
  return result;
};

export const logOut = async () => {
  const result = await axiosInstance.post('/oauth/logout');
  return result;
};

export const getUserProfile = async () => {
  const result: AxiosResponse<GetUserProfileRes> =
    await axiosInstance.get('/member/summary');
  return result.data;
};

export const addMemberToRoom = async (roomId: string) => {
  const result = await axiosInstance.get(`/room/${roomId}/members`);
  return result.data;
};
