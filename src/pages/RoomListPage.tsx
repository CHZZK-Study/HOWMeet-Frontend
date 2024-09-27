import Header from '@/components/common/Header';
import CreateRoomButton from '@/components/roomlist/CreateRoomButton';
import RoomList from '@/components/roomlist/RoomList';
import { PATH } from '@/constants/path';
import { TITLE } from '@/constants/title';
import useRoomList from '@/hooks/useRoomList';
import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import { PageTitle } from '@/styles/components/text';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function RoomListPage() {
  const navigate = useNavigate();
  const [isBottom, setIsBottom] = useState(false);

  const userInfo = sessionStorage.getItem('UserStore') || '';
  const parsedUserInfo = JSON.parse(userInfo);
  const userId = parsedUserInfo.state.user.id;

  const { roomListRes, fetchNextPage, hasNextPage } = useRoomList(userId);

  useEffect(() => {
    if (isBottom && hasNextPage) fetchNextPage();
  }, [isBottom, hasNextPage, fetchNextPage]);

  if (!roomListRes) return null;

  const roomList =
    roomListRes.pages[0].roomList.length === 0
      ? []
      : roomListRes.pages.map((item) => item.roomList).flat();

  return (
    <Container>
      <Header
        title="방 목록"
        onLeftArrowIconClick={() => navigate(PATH.home)}
      />
      <ContentContainer>
        <Title>
          {TITLE.attendRoom}{' '}
          <span className="currentNumber">{roomList.length}</span>
        </Title>
        <RoomList roomList={roomList} setIsBottom={setIsBottom} />
        <CreateRoomButton />
      </ContentContainer>
    </Container>
  );
}

const Title = styled(PageTitle)`
  ${({ theme }) => theme.typo.heading.bold[22]}

  .currentNumber {
    color: ${({ theme }) => theme.color.point.green};
  }
`;

const Container = styled(FlexColContainer)`
  height: 100dvh;
`;

export default RoomListPage;
