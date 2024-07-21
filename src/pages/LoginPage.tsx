import MemberLogin from '@/components/login/MemberLogin';
import NonMemberLogin from '@/components/login/NonMemberLogin';
import TapHeader from '@/components/login/TapHeader';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

function LoginPage() {
  const [searchParams] = useSearchParams();
  const loginType = searchParams.get('type');

  return (
    <Container>
      <TapHeader />
      <Content>
        {loginType === 'non-member' ? <NonMemberLogin /> : <MemberLogin />}
      </Content>
    </Container>
  );
}

export default LoginPage;

const Container = styled.main`
  width: 100%;
  min-height: 100dvh;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  flex: 1;
  height: fit-content;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  color: black;
`;
