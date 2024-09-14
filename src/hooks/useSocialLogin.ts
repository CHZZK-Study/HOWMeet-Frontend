import { socialLogin } from '@/apis/user.api';
import { PATH } from '@/constants/path';
import { STORAGE_KEY } from '@/constants/storage';
import { handleAllowNotification } from '@/lib/notification';
import { SocialLoginReq } from '@/models/user.model';
import useUserStore from '@/store/userStore';
import { ProviderName } from '@/types/socialLogin';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useSocialLogin = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      const providerName = localStorage.getItem(
        STORAGE_KEY.socialLoginType
      ) as ProviderName;
      handleLoginCode({ code, providerName });
    }
  }, [code]);

  const handleLoginCode = (req: SocialLoginReq) => {
    socialLogin(req).then(({ data }) => {
      if (data) {
        const { nickname, memberId, accessToken } = data;

        setUser({ username: nickname, id: memberId });
        localStorage.setItem(STORAGE_KEY.accessToken, accessToken);
        handleAllowNotification();
        navigate(PATH.home);
      }
    });
  };
};
