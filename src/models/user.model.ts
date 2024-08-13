export interface LoginReq {
  nickname: string;
  password: string;
}

export interface LoginRes {
  accessToken: string;
  guestId: string;
  nickname: string;
}
