import styled from 'styled-components';
import RoomItem from './RoomItem';

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

function RoomList() {
  return (
    <RoomListContainer>
      {mock.map((item) => (
        <RoomItem {...item} />
      ))}
    </RoomListContainer>
  );
}

const RoomListContainer = styled.ul`
  height: 75vh;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export default RoomList;
