import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CancelIcon } from 'public/assets/icons';
import { PATH } from '@/constants/path';
import SocialLoginButtons from './SocialLoginButtons';
import Button from '../common/Button';
import LoginGuide from './LoginGuide';

function DefaultLogin() {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <h1>로그인</h1>
        <button type="button" onClick={() => navigate(PATH.main)}>
          <CancelIcon />
        </button>
      </Header>
      <Content>
        <div className="form-wrapper">
          <TitleBar>
            <hr />
            <span className="title">SNS 계정으로 간편 로그인</span>
          </TitleBar>
          <SocialLoginButtons />
        </div>
        <Divider />
        <Button
          $style="outlined"
          $theme="primary-green"
          onClick={() => navigate(PATH.non_member_meeting)}
        >
          비회원으로 일정 만들기
        </Button>
        <LoginGuide />
      </Content>
    </Container>
  );
}

export default DefaultLogin;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 18px 0px;
  ${({ theme }) => theme.typo.body.medium[16]}
  position: relative;

  button {
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0 24px;
  padding-bottom: 40px;

  .form-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const TitleBar = styled.div`
  width: 100%;
  display: flex;
  position: relative;

  hr {
    width: 100%;
    border: 0;
    height: 1px;
    background: ${({ theme }) => theme.color.secondary.solid.bk[300]};
  }

  .title {
    width: max-content;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 10px;
    ${({ theme }) => theme.typo.body.medium[14]}
    background-color: ${({ theme }) => theme.color.secondary.solid.bk[50]};
  }
`;

const Divider = styled.hr`
  width: 100%;
  border: 0;
  height: 3px;
  background: ${({ theme }) => theme.color.secondary.solid.bk[100]};
`;
