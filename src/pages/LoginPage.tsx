import MemberLogin from '@/components/login/MemberLogin';
import NonMemberLogin from '@/components/login/NonMemberLogin';
import TapHeader from '@/components/login/TapHeader';
import { FlexColContainer } from '@/styles/components/container';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

function LoginPage() {
  const [searchParams] = useSearchParams();
  const loginType = searchParams.get('type');

  return (
    <FlexColContainer>
      <TapHeader />
      <Content>
        {loginType === 'non-member' ? <NonMemberLogin /> : <MemberLogin />}
      </Content>
    </FlexColContainer>
  );
}

export default LoginPage;

const Content = styled.div`
  width: 100%;
  flex: 1;
  height: fit-content;
  padding: 40px 0;
`;
