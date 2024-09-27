import Header from '@/components/common/Header';
import Attenders from '@/components/roomdetail/Attenders';
import ConfirmList from '@/components/roomdetail/ConfirmList';
import CreateNewMeeting from '@/components/roomdetail/CreateNewMeeting';
import NonConfirmList from '@/components/roomdetail/NonConfirmList';
import useRoom from '@/hooks/useRoom';
import {
  FlexColContainer,
  ContentContainer,
} from '@/styles/components/container';
import { EmptyBox } from '@/styles/components/emptybox';
import { PageTitle } from '@/styles/components/text';
import { ShareIcon } from 'public/assets/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import styled from 'styled-components';

function RoomPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userInfo = sessionStorage.getItem('UserStore') || '';
  const parsedUserInfo = JSON.parse(userInfo);
  const userId = parsedUserInfo.state.user.id;

  const { roomDetail, isError } = useRoom(Number(id));

  if (isError) toast.error('잠시후 다시 시도해 주세요');

  if (!roomDetail) return null;

  const progressMeetings = roomDetail.schedules.filter(
    (item) => item.status === 'PROGRESS'
  );
  const completedMeetings = roomDetail.schedules.filter(
    (item) => item.status === 'COMPLETE'
  );

  const leaderMember = roomDetail.roomMembers.filter(
    (member) => member.memberId === userId
  );

  const { isLeader } = leaderMember[0];

  return (
    <FlexColContainer>
      <Header title="방 정보" onLeftArrowIconClick={() => navigate(-1)} />
      <ContentContainer>
        <TitleWrapper>
          <PageTitle>{roomDetail.name}</PageTitle>
          <ShareIcon />
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
        <Description>확정된 일정을 확인해보세요 !</Description>
        {completedMeetings.length === 0 ? (
          <EmptyBox $height="96px">아직 일정이 없습니다</EmptyBox>
        ) : (
          <ConfirmList completedMeetings={completedMeetings.reverse()} />
        )}
      </ContentContainer>
      <CreateNewMeeting />
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
