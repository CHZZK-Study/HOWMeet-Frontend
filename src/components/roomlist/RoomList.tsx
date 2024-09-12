import styled from 'styled-components';
import { RoomListRes } from '@/models/room.model';
import RoomItem from './RoomItem';

interface Props {
  roomList: RoomListRes[];
}

function RoomList({ roomList }: Props) {
  return (
    <RoomListContainer>
      {roomList.map((item) => (
        <RoomItem
          key={item.roomId}
          name={item.name}
          date={item.schedules[0].dates[1]}
          time={item.schedules[0].time}
          member={item.memberSummary}
        />
      ))}
    </RoomListContainer>
  );
}

const RoomListContainer = styled.ul`
  overflow-y: scroll;
  height: 80%;

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export default RoomList;
