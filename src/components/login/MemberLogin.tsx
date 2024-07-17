import React from 'react';
import styled from 'styled-components';

function MemberLogin() {
  return (
    <Wrapper>
      <Title>
        간편 로그인으로 이용하면,
        <br />
        일정을 <strong>여러 번</strong> 조율할 수 있어요
      </Title>
      <div className="button-container">
        <SocialLoginButton>카카오 계정 로그인</SocialLoginButton>
        <SocialLoginButton>네이버 계정 로그인</SocialLoginButton>
        <SocialLoginButton>구글 계정 로그인</SocialLoginButton>
      </div>
    </Wrapper>
  );
}

export default MemberLogin;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;

  .button-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-style: normal;
  line-height: 140%;
  letter-spacing: 0.02px;

  strong {
    font-weight: 700;
  }
`;

const SocialLoginButton = styled.button`
  width: 100%;
  background-color: #212121;
  text-align: center;
  padding: 16px 0;
  border-radius: 8px;

  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
`;
