import { ProviderName } from '@/types/auth';

export interface LoginReq {
  guestScheduleId: string;
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

export interface GetSocialLoginUrlRes {
  clientId: string;
  scopes: string[];
  method: string;
  url: string;
}

export interface GetUserProfileRes {
  id: string;
  nickname: string;
}
