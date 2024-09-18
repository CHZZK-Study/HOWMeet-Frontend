import MemberLogin from '@/components/login/MemberLogin';
import NonMemberLogin from '@/components/login/NonMemberLogin';
import TapHeader from '@/components/login/TapHeader';
import { useSocialLogin } from '@/hooks/useSocialLogin';
import { FlexColContainer } from '@/styles/components/container';
import { LogoTitleIcon } from 'public/assets/icons';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

function LoginPage() {
  useSocialLogin();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const loginType = searchParams.get('type');

  return (
    <FlexColContainer>
      {roomId ? (
        <Header>
          <LogoTitleIcon width={140} />
        </Header>
      ) : (
        <TapHeader />
      )}

      <Content>
        {loginType === 'non-member' ? (
          <NonMemberLogin type={roomId ? 'guest' : 'default'} />
        ) : (
          <MemberLogin type={roomId ? 'guest' : 'default'} />
        )}
      </Content>
    </FlexColContainer>
  );
}

export default LoginPage;

const Content = styled.div`
  width: 100%;
  flex: 1;
  height: fit-content;
  padding: 10px 0;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
`;
