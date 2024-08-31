export const LOGIN_URL = {
  google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_APP_REDIRECT_URI}&scope=email profile`,
  kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_APP_KAKAO_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_APP_REDIRECT_URI}`,
  naver: `https://nid.naver.com/oauth2.0/authorize?client_id=${import.meta.env.VITE_APP_NAVER_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_APP_REDIRECT_URI}&state={}`,
};
