import { login } from '@/apis/user.api';
import { STORAGE_KEY } from '@/constants/storage';
import { handleAllowNotification } from '@/lib/notification';
import { LoginReq } from '@/models/user.model';
import useStepStore from '@/store/meeting/useStepStore';
import useUserStore from '@/store/userStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export const useLogin = () => {
  const navigate = useNavigate();
  const setStep = useStepStore((state) => state.setStep);
  const [searchParams] = useSearchParams();
  const callback = searchParams.get('callbackUrl');
  const setUser = useUserStore((state) => state.setUser);

  const { mutate: handleLogin } = useMutation({
    mutationFn: (loginData: LoginReq) => login(loginData),
    onSuccess: (result) => {
      const { nickname, guestId, accessToken } = result.data;

      setUser({ username: nickname, id: guestId, isMember: false });
      sessionStorage.setItem(STORAGE_KEY.accessToken, accessToken);
      handleAllowNotification();

      if (callback) {
        navigate(callback, { replace: true });
      } else {
        setStep('share');
      }
    },
    onError: () => {
      toast.error('로그인에 실패했습니다.');
    },
  });

  return { handleLogin };
};
