import { ProviderName } from '@/types/socialLogin';

export interface LoginReq {
  nickname: string;
  password: string;
}

export interface LoginRes {
  accessToken: string;
  guestId: string;
  nickname: string;
}

export interface SocialLoginReq {
  providerName: ProviderName;
  code: string;
}

export interface SocialLoginRes {
  accessToken: string;
  memberId: string;
  nickname: string;
}
