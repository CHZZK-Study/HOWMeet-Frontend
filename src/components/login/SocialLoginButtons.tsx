import { getSocialLoginUrl } from '@/apis/user.api';
import { STORAGE_KEY } from '@/constants/storage';
import { ProviderName } from '@/types/socialLogin';
import { GoogleIcon, KakaoIcon, NaverIcon } from 'public/assets/icons';
import styled from 'styled-components';

function SocialLoginButtons() {
  const handleSocialLogin = async (service: ProviderName) => {
    localStorage.setItem(STORAGE_KEY.socialLoginType, service);
    const result = await getSocialLoginUrl(service);
    const { url } = result.data;
    window.location.href = url;
  };

  return (
    <ButtonWrapper>
      <SocialLoginButton onClick={() => handleSocialLogin('kakao')}>
        <KakaoIcon width={34} height={34} />
        <span className="button-text">카카오 계정 로그인</span>
      </SocialLoginButton>
      <SocialLoginButton onClick={() => handleSocialLogin('naver')}>
        <NaverIcon width={34} height={30} />
        <span className="button-text">네이버 계정 로그인</span>
      </SocialLoginButton>
      <SocialLoginButton onClick={() => handleSocialLogin('google')}>
        <GoogleIcon width={34} height={30} />
        <span className="button-text">구글 계정 로그인</span>
      </SocialLoginButton>
    </ButtonWrapper>
  );
}

export default SocialLoginButtons;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const SocialLoginButton = styled.button`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.color.primary.white};
  box-sizing: border-box;
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px 0px rgba(90, 90, 90, 0.1);

  display: flex;
  align-items: center;
  gap: 14px;

  .button-text {
    flex: 1;
    text-align: start;
    color: ${({ theme }) => theme.color.secondary.solid.bk[700]};
    ${({ theme }) => theme.typo.body.medium[16]}
  }
`;
