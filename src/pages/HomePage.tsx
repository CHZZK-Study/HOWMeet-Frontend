import LogOut from '@/components/bottomsheet/LogOut';
import Modal from '@/components/common/Modal';
import HomeHeader from '@/components/home/HomeHeader';
import UpComming from '@/components/home/UpComming';
import CreateRoomButton from '@/components/roomlist/CreateRoomButton';
import RoomList from '@/components/roomlist/RoomList';
import { SUB_TITLE, TITLE } from '@/constants/title';
import useRoomList from '@/hooks/useRoomList';
import { useLogOutModal } from '@/store/useModalStore';
import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import { PageTitle } from '@/styles/components/text';
import styled from 'styled-components';

function HomePage() {
  const userInfo = sessionStorage.getItem('UserStore') || '';
  const parsedUserInfo = JSON.parse(userInfo);
  const userId = parsedUserInfo.state.user.id;
  const userName = parsedUserInfo.state.user.username;

  const { isOpen: isLogOutOpen, close: closeLogOut } = useLogOutModal();
  const { roomListRes, isError } = useRoomList(userId);

  if (isError) window.alert('잠시후 다시 시도해 주세요.');
  if (!roomListRes) return null;

  const roomList =
    roomListRes.roomList.length === 0 ? [] : roomListRes.roomList;

  return (
    <FlexColContainer>
      <ContentContainer>
        <HomeHeader />
        <PageTitle>{`${userName}님! 반가워요\r\n일정을 효율적으로 관리해봐요`}</PageTitle>
        <ContentWrapper>
          <SubTitle>{SUB_TITLE.upcomming}</SubTitle>
          <UpComming />
        </ContentWrapper>
        <ContentWrapper>
          <SubTitle>{TITLE.attendRoom}</SubTitle>
          {roomList.length === 0 ? (
            <EmptyBox>아직 참여중인 방이 없습니다</EmptyBox>
          ) : (
            <RoomList roomList={roomList} />
          )}
        </ContentWrapper>
        <TotalButton>전체 모임보기</TotalButton>
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

const EmptyBox = styled.div`
  width: 100%;
  height: 270px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color.primary.white};
  border-radius: 14px;
  box-shadow: 0px 3.805px 10.559px 0px rgba(90, 90, 90, 0.1);
  color: ${({ theme }) => theme.color.secondary.solid.bk[500]};
  ${({ theme }) => theme.typo.body.regular[20]}
`;
export default HomePage;
