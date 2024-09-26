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
  const userId = JSON.parse(userInfo).state.user.id;
  const { isOpen: isLogOutOpen, close: closeLogOut } = useLogOutModal();
  const { roomList, isError } = useRoomList(userId);

  if (isError) window.alert('잠시후 다시 시도해 주세요.');

  if (!roomList) return null;

  return (
    <FlexColContainer>
      <ContentContainer>
        <HomeHeader />
        <PageTitle>{`윤아님! 반가워요\r\n일정을 효율적으로 관리해봐요`}</PageTitle>
        <ContentWrapper>
          <SubTitle>{SUB_TITLE.upcomming}</SubTitle>
          <UpComming />
        </ContentWrapper>
        <ContentWrapper>
          <SubTitle>{TITLE.attendRoom}</SubTitle>
          <RoomList roomList={roomList} />
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
export default HomePage;
