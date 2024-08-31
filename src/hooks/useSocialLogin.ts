import { socialLogin } from '@/apis/user.api';
import { SocialLoginReq } from '@/models/user.model';
import { ProviderName } from '@/types/socialLogin';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSocialLogin = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const providerName = searchParams.get('provider') as ProviderName;

  useEffect(() => {
    if (code && providerName) {
      handleLoginCode({ code, providerName });
    }
  }, [code, providerName]);

  const handleLoginCode = (req: SocialLoginReq) => {
    socialLogin(req).then(({ data }) => {
      // TODO: 유저 정보 저장, redirect
      console.log(data);
    });
  };
};
