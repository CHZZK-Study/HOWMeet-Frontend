import { login } from '@/apis/user.api';
import { STORAGE_KEY } from '@/constants/storage';
import { LoginReq } from '@/models/user.model';
import useUserStore from '@/store/userStore';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = (loginData: LoginReq) => {
    login(loginData).then((res) => {
      if (res) {
        const { nickname, guestId, accessToken } = res.data;

        setUser({ username: nickname, guestId });
        sessionStorage.setItem(STORAGE_KEY.accessToken, accessToken);
        navigate('/new-meeting');
      }
    });
  };

  return { handleLogin };
};
