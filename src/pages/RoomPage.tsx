import Header from '@/components/common/Header';
import Attenders from '@/components/roomdetail/Attenders';
import ConfirmList from '@/components/roomdetail/ConfirmList';
import CreateNewMeeting from '@/components/roomdetail/CreateNewMeeting';
import NonConfirmList from '@/components/roomdetail/NonConfirmList';
import { PATH } from '@/constants/path';
import { useRedirect } from '@/hooks/useRedirect';
import useRoom from '@/hooks/useRoom';
import useToolTip from '@/hooks/useToolTip';
import useUserStore from '@/store/userStore';
import {
  FlexColContainer,
  ContentContainer,
} from '@/styles/components/container';
import { EmptyBox } from '@/styles/components/emptybox';
import { PageTitle } from '@/styles/components/text';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import styled from 'styled-components';

function RoomPage() {
  useRedirect();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { pathname } = useLocation();
  const { isToolTipOpen, closeToolTip } = useToolTip();
  const isNotLoggedIn = useUserStore((state) => state.user) === null;

  useEffect(() => {
    if (isNotLoggedIn) {
      navigate(`${PATH.login}?callbackUrl=${pathname}`, { replace: true });
    }
  }, [pathname, isNotLoggedIn, navigate]);

  const userInfo = sessionStorage.getItem('UserStore') || '';
  const parsedUserInfo = JSON.parse(userInfo);
  const userId = parsedUserInfo.state.user.id;

  const { roomDetail, isError } = useRoom(Number(roomId));

  if (isError) toast.error('잠시후 다시 시도해 주세요');

  if (!roomDetail || !user) return null;

  const progressMeetings = roomDetail.schedules.filter(
    (item) => item.status === 'PROGRESS'
  );
  const completedMeetings = roomDetail.schedules.filter(
    (item) => item.status === 'COMPLETE'
  );

  const leaderMember = roomDetail.roomMembers.filter(
    (member) => member.memberId === user.id
  );

  const { isLeader } = leaderMember[0];

  const handleCopyRoomUrl = async () => {
    try {
      await navigator.clipboard.writeText(
        `${import.meta.env.VITE_APP_CLIENT_URL}/room/${roomId}`
      );
      toast.info('링크가 복사되었습니다.');
    } catch (error) {
      toast.error('복사에 실패하였습니다.');
    }
  };

  return (
    <FlexColContainer>
      <Header
        title="방 정보"
        onLeftArrowIconClick={() => navigate(PATH.rooms)}
        isShare
        isVisible={isToolTipOpen}
        toggle={closeToolTip}
        onShareClick={handleCopyRoomUrl}
      />
      <ContentContainer>
        <TitleWrapper>
          <PageTitle>{roomDetail.name}</PageTitle>
        </TitleWrapper>
        <SubTitle>참여 인원</SubTitle>
        <Attenders member={roomDetail.roomMembers} />
        <SubTitle>확정되지 않은 일정</SubTitle>
        <Description>가능한 시간을 제출해주세요.</Description>
        {progressMeetings.length === 0 ? (
          <EmptyBox $height="96px">아직 일정이 없습니다</EmptyBox>
        ) : (
          <NonConfirmList
            isLeader={isLeader}
            progressMeetings={progressMeetings.reverse()}
          />
        )}
        <SubTitle>전체 일정</SubTitle>
        <Description>확정된 일정을 확인해보세요!</Description>
        {completedMeetings.length === 0 ? (
          <EmptyBox $height="96px">아직 일정이 없습니다</EmptyBox>
        ) : (
          <ConfirmList completedMeetings={completedMeetings.reverse()} />
        )}
      </ContentContainer>
      <CreateNewMeeting
        roomName={roomDetail.name}
        roomId={Number(roomDetail.roomId)}
      />
    </FlexColContainer>
  );
}

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    margin-top: 20px;
    cursor: pointer;
  }
`;

const SubTitle = styled.h3`
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
  ${({ theme }) => theme.typo.body.semi_bold[22]}
`;

const Description = styled.h4`
  color: ${({ theme }) => theme.color.secondary.solid.bk[700]};
  ${({ theme }) => theme.typo.body.medium[18]}
`;

export default RoomPage;
