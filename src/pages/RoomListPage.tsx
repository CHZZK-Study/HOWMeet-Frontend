import Header from '@/components/common/Header';
import CreateRoomButton from '@/components/roomlist/CreateRoomButton';
import RoomList from '@/components/roomlist/RoomList';
import { TITLE } from '@/constants/title';
import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import { PageTitle } from '@/styles/components/text';
import styled from 'styled-components';

const mock = [
  {
    title: '마이팀 방',
    date: '2024. 07. 08 14:00~15:00',
    member: '김민석님 외 12명',
  },
  {
    title: '아자아자 방',
    date: '2024. 07. 09 12:00~16:00',
    member: '김민석님 외 12명',
  },
  {
    title: '마이팀 방',
    date: '2024. 07. 08 14:00~15:00',
    member: '김민석님 외 12명',
  },
  {
    title: '아자아자 방',
    date: '2024. 07. 09 12:00~16:00',
    member: '김민석님 외 12명',
  },
  {
    title: '마이팀 방',
    date: '2024. 07. 08 14:00~15:00',
    member: '김민석님 외 12명',
  },
  {
    title: '아자아자 방',
    date: '2024. 07. 09 12:00~16:00',
    member: '김민석님 외 12명',
  },
  {
    title: '마이팀 방',
    date: '2024. 07. 08 14:00~15:00',
    member: '김민석님 외 12명',
  },
  {
    title: '아자아자 방',
    date: '2024. 07. 09 12:00~16:00',
    member: '김민석님 외 12명',
  },
];

function RoomListPage() {
  return (
    <Container>
      <Header title="방 목록" />
      <ContentContainer>
        <Title>
          {TITLE.attendRoom} <span className="currentNumber">6</span>
        </Title>
        <RoomList mock={mock} />
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
