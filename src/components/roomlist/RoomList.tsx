import styled from 'styled-components';
import { Schedule } from '@/types/room';
import RoomItem from './RoomItem';

interface Props {
  roomList: {
    roomId: string;
    name: string;
    memberSummary: string;
    schedules: Schedule[];
    hasNonParticipant: boolean;
  }[];
}

function RoomList({ roomList }: Props) {
  return (
    <RoomListContainer>
      {roomList.map((item) => {
        const completedSchedules = item.schedules.filter(
          (scheduleItem) => scheduleItem.status === 'COMPLETE'
        );
        const latestSchedule =
          completedSchedules[completedSchedules.length - 1];

        return (
          <RoomItem
            key={item.roomId}
            roomId={item.roomId}
            name={item.name}
            member={item.memberSummary}
            schedule={latestSchedule}
            hasNonParticipant={item.hasNonParticipant}
          />
        );
      })}
    </RoomListContainer>
  );
}

const RoomListContainer = styled.ul`
  overflow-y: scroll;
  height: 85%;

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export default RoomList;
