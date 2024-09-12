import Header from '@/components/common/Header';
import CreateRoomButton from '@/components/roomlist/CreateRoomButton';
import RoomList from '@/components/roomlist/RoomList';
import { TITLE } from '@/constants/title';
import useRoomList from '@/hooks/useRoomList';
import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import { PageTitle } from '@/styles/components/text';
import styled from 'styled-components';

function RoomListPage() {
  const { roomList, isError } = useRoomList(1);

  if (isError) window.alert('잠시후 다시 시도해 주세요.');

  if (!roomList) return null;

  return (
    <Container>
      <Header title="방 목록" />
      <ContentContainer>
        <Title>
          {TITLE.attendRoom}{' '}
          <span className="currentNumber">{roomList.length}</span>
        </Title>
        <RoomList roomList={roomList} />
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
