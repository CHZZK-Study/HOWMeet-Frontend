import { login } from '@/apis/user.api';
import { PATH } from '@/constants/path';
import { STORAGE_KEY } from '@/constants/storage';
import { handleAllowNotification } from '@/lib/notification';
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

        setUser({ username: nickname, id: guestId });
        sessionStorage.setItem(STORAGE_KEY.accessToken, accessToken);
        handleAllowNotification();
        navigate(PATH.new_meeting);
      }
    });
  };

  return { handleLogin };
};
