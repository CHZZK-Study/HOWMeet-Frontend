import styled from 'styled-components';
import { GuestTitle, Title } from '@/styles/components/text';
import { GoogleIcon, KakaoIcon, NaverIcon } from 'public/assets/icons';

interface Props {
  type?: 'guest' | 'default';
}

function MemberLogin({ type = 'default' }: Props) {
  return (
    <Container>
      {type === 'guest' ? (
        <GuestTitle>
          <h2>일정 이름</h2>
          <span>간편 로그인 후에 일정을 조율해 보세요.</span>
        </GuestTitle>
      ) : (
        <Title>
          간편 로그인으로 이용하면,
          <br />
          일정을 <strong>여러 번</strong> 조율할 수 있어요
        </Title>
      )}
      <ButtonWrapper>
        <SocialLoginButton>
          <KakaoIcon width={34} height={34} />
          <span className="button-text">카카오 계정 로그인</span>
        </SocialLoginButton>
        <SocialLoginButton>
          <NaverIcon width={34} height={30} />
          <span className="button-text">네이버 계정 로그인</span>
        </SocialLoginButton>
        <SocialLoginButton>
          <GoogleIcon width={34} height={30} />
          <span className="button-text">구글 계정 로그인</span>
        </SocialLoginButton>
      </ButtonWrapper>
    </Container>
  );
}

export default MemberLogin;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 20px;
  gap: 48px;
`;

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
