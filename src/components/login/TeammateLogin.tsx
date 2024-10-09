import { GuestTitle } from '@/styles/components/text';
import { LogoTitleIcon } from 'public/assets/icons';
import { useMeetingInfo } from '@/hooks/useMeetingInfo';
import styled from 'styled-components';
import useRoom from '@/hooks/useRoom';
import SocialLoginButtons from './SocialLoginButtons';
import LoginForm from './LoginForm';

interface Props {
  roomId: string | null;
}

function TeammateLogin({ roomId }: Props) {
  const { isGuest, meetingId, meetingInfo } = useMeetingInfo();
  const { roomDetail } = useRoom(roomId ? Number(roomId) : undefined);

  if (!meetingInfo && !roomDetail) return null;

  return (
    <Container>
      <Header>
        <LogoTitleIcon width={140} />
        {isGuest ? (
          <GuestTitle>
            <h2>{meetingInfo.name.value}</h2>
            <span>
              비회원으로 일정을 만든 경우에는
              <br />
              결과가 공유될 때 로그인 정보가 삭제됩니다.
            </span>
          </GuestTitle>
        ) : (
          <GuestTitle>
            <h2>{roomDetail?.name}</h2>
            <span>간편 로그인 후에 일정을 조율해 보세요.</span>
          </GuestTitle>
        )}
      </Header>
      <LoginFormContainer>
        {isGuest ? (
          <LoginForm meetingId={meetingId!} />
        ) : (
          <SocialLoginButtons />
        )}
      </LoginFormContainer>
    </Container>
  );
}

export default TeammateLogin;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding: 18px 24px;
`;

const LoginFormContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
`;
