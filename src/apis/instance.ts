import { BASE_URL, DEFAULT_TIMOUT } from '@/constants/api';
import { PATH } from '@/constants/path';
import { STORAGE_KEY } from '@/constants/storage';
import useUserStore from '@/store/userStore';
import { getTokenFromStorage } from '@/utils/token';
import axios from 'axios';
import { toast } from 'sonner';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMOUT,
});

axios.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  (req) => {
    const { accessToken } = getTokenFromStorage();

    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  },
  (err) => Promise.reject(err)
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const { user, setUser } = useUserStore.getState();
    const accessToken = localStorage.getItem(STORAGE_KEY.accessToken);

    if (user && err.response.status === 401) {
      const originRequest = err.config;
      try {
        const result = await axios.post(`${BASE_URL}/oauth/reissue`, {
          headers: {
            token: accessToken,
          },
        });

        const newAccessToken = result.data.accessToken;

        if (newAccessToken) {
          localStorage.setItem(STORAGE_KEY.accessToken, newAccessToken);
          originRequest.headers.token = newAccessToken;
        }
        return await axiosInstance(originRequest);
      } catch (error) {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY.accessToken);
        window.location.href = PATH.login;
        toast.error('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
        return Promise.reject(error);
      }
    } else if (!user && err.response.status === 401) {
      setUser(null);
      sessionStorage.removeItem(STORAGE_KEY.accessToken);
      window.location.href = PATH.login;
      toast.error('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);
