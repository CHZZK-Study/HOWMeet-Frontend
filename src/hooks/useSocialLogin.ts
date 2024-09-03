import { socialLogin } from '@/apis/user.api';
import { STORAGE_KEY } from '@/constants/storage';
import { SocialLoginReq } from '@/models/user.model';
import { ProviderName } from '@/types/socialLogin';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSocialLogin = () => {
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
      // TODO: 유저 정보 저장, redirect
      console.log(data);
    });
  };
};
