import TapHeader from '@/components/login/TapHeader';
import React from 'react';
import styled from 'styled-components';

function LoginPage() {
  return (
    <Container>
      <TapHeader />
      <div>login</div>
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
