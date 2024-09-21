import { login } from '@/apis/user.api';
import { PATH } from '@/constants/path';
import { STORAGE_KEY } from '@/constants/storage';
import { handleAllowNotification } from '@/lib/notification';
import { LoginReq } from '@/models/user.model';
import useUserStore from '@/store/userStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const { mutate: handleLogin } = useMutation({
    mutationFn: (loginData: LoginReq) => login(loginData),
    onSuccess: (result) => {
      const { nickname, guestId, accessToken } = result.data;

      setUser({ username: nickname, id: guestId, isMember: false });
      sessionStorage.setItem(STORAGE_KEY.accessToken, accessToken);
      handleAllowNotification();
      navigate(PATH.new_meeting);
    },
    onError: () => {
      toast.error('로그인에 실패했습니다.');
    },
  });

  return { handleLogin };
};
