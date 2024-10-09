import { addMemberToRoom, logOut, socialLogin } from '@/apis/user.api';
import { PATH } from '@/constants/path';
import { STORAGE_KEY } from '@/constants/storage';
import { handleAllowNotification } from '@/lib/notification';
import { SocialLoginReq } from '@/models/user.model';
import useUserStore from '@/store/userStore';
import { ProviderName } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export const useSocialLogin = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [searchParams] = useSearchParams();
  const callback = searchParams.get('callbackUrl');
  const code = searchParams.get('code');
  const roomId = searchParams.get('roomId');

  useEffect(() => {
    if (code) {
      const providerName = localStorage.getItem(
        STORAGE_KEY.socialLoginType
      ) as ProviderName;
      handleLoginCode({ code, providerName });
    }
  }, [code]);

  useEffect(() => {
    if (callback) {
      localStorage.setItem(STORAGE_KEY.callbackUrl, callback);
    }
    if (roomId) {
      localStorage.setItem(STORAGE_KEY.roomId, roomId);
    }
  }, [callback, roomId]);

  const { mutate: handleLoginCode } = useMutation({
    mutationFn: (req: SocialLoginReq) => socialLogin(req),
    onSuccess: async (result) => {
      const { nickname, memberId, accessToken } = result.data;

      setUser({ username: nickname, id: memberId, isMember: true });
      localStorage.setItem(STORAGE_KEY.accessToken, accessToken);
      handleAllowNotification();

      const roomIdToLogin = localStorage.getItem(STORAGE_KEY.roomId);

      if (roomIdToLogin) {
        await addMemberToRoom(roomIdToLogin).catch(() => {
          toast.error('로그인에 실패했습니다.');
          logOut();
        });
        localStorage.removeItem(STORAGE_KEY.roomId);
      }

      const callbackUrl = localStorage.getItem(STORAGE_KEY.callbackUrl);
      navigate(callbackUrl || PATH.home);
      localStorage.removeItem(STORAGE_KEY.callbackUrl);
    },
  });
};
