import MemberLogin from '@/components/login/MemberLogin';
import NonMemberLogin from '@/components/login/NonMemberLogin';
import { FlexColContainer } from '@/styles/components/container';
import { LogoTitleIcon } from 'public/assets/icons';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

function GuestLoginPage() {
  const [searchParams] = useSearchParams();
  const roomType = searchParams.get('roomType');

  return (
    <FlexColContainer>
      <Header>
        <LogoTitleIcon width={140} />
      </Header>
      <Content>
        {roomType === 'non-member' ? (
          <NonMemberLogin type="guest" />
        ) : (
          <MemberLogin type="guest" />
        )}
      </Content>
    </FlexColContainer>
  );
}

export default GuestLoginPage;

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const Content = styled.div`
  width: 100%;
  flex: 1;
  height: fit-content;
  display: flex;
  padding: 10px 0;
`;
