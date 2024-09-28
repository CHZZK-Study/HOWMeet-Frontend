import LogOut from '@/components/bottomsheet/LogOut';
import Modal from '@/components/common/Modal';
import HomeHeader from '@/components/home/HomeHeader';
import UpComming from '@/components/home/UpComming';
import CreateRoomButton from '@/components/roomlist/CreateRoomButton';
import RoomList from '@/components/roomlist/RoomList';
import { PATH } from '@/constants/path';
import { SUB_TITLE, TITLE } from '@/constants/title';
import useClosestMeeting from '@/hooks/useClosestMeeting';
import useRoomList from '@/hooks/useRoomList';
import { useLogOutModal } from '@/store/useModalStore';
import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import { EmptyBox } from '@/styles/components/emptybox';
import { PageTitle } from '@/styles/components/text';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function HomePage() {
  const navigate = useNavigate();

  const userInfo = sessionStorage.getItem('UserStore') || '';
  const parsedUserInfo = JSON.parse(userInfo);
  const userId = parsedUserInfo.state.user.id;
  const userName = parsedUserInfo.state.user.username;

  const { isOpen: isLogOutOpen, close: closeLogOut } = useLogOutModal();
  const { roomListRes } = useRoomList(userId);
  const { findClosestSchedules } = useClosestMeeting();

  if (!roomListRes) return null;

  const roomList =
    roomListRes.pages[0].roomList.length === 0
      ? []
      : roomListRes.pages[0].roomList;

  const today: Date = new Date();

  const closestSchedules = findClosestSchedules(roomList, today);

  return (
    <FlexColContainer>
      <ContentContainer>
        <HomeHeader />
        <PageTitle>{`${userName}님! 반가워요\r\n일정을 효율적으로 관리해봐요`}</PageTitle>
        <ContentWrapper>
          <SubTitle>{SUB_TITLE.upcomming}</SubTitle>
          {closestSchedules.length === 0 ? (
            <EmptyBox $height="122px">다가오는 일정이 없습니다</EmptyBox>
          ) : (
            <UpComming schedules={closestSchedules} />
          )}
        </ContentWrapper>
        <ContentWrapper>
          <SubTitle>{TITLE.attendRoom}</SubTitle>
          {roomList.length === 0 ? (
            <EmptyBox $height="270px">아직 참여중인 방이 없습니다</EmptyBox>
          ) : (
            <RoomList roomList={roomList.slice(0, 2)} />
          )}
        </ContentWrapper>
        <TotalButton onClick={() => navigate(PATH.rooms)}>
          전체 모임보기
        </TotalButton>
        <CreateRoomButton />
      </ContentContainer>
      {isLogOutOpen && (
        <Modal onClose={closeLogOut}>
          <LogOut />
        </Modal>
      )}
    </FlexColContainer>
  );
}

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.color.secondary.solid.bk[700]};
  ${({ theme }) => theme.typo.body.medium[20]}
`;

const TotalButton = styled.button`
  background: none;
  color: ${({ theme }) => theme.color.secondary.solid.bk[400]};
  ${({ theme }) => theme.typo.body.semi_bold[12]}
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export default HomePage;
