import MemberLogin from '@/components/login/MemberLogin';
import TapHeader from '@/components/login/TapHeader';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

function LoginPage() {
  const [searchParams] = useSearchParams();
  const loginType = searchParams.get('type');

  return (
    <Container>
      <TapHeader />
      {loginType === 'one-time' ? <div>onetime</div> : <MemberLogin />}
    </Container>
  );
}

export default LoginPage;

const Container = styled.main`
  width: 100%;
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
`;
