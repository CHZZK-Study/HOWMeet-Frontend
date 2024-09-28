import styled from 'styled-components';
import { Schedule } from '@/types/room';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import RoomItem from './RoomItem';

interface Props {
  roomList: {
    roomId: string;
    name: string;
    memberSummary: string;
    schedules: Schedule[];
    hasNonParticipant: boolean;
  }[];
  setIsBottom?: (value: boolean) => void;
}

function RoomList({ roomList, setIsBottom }: Props) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (setIsBottom) setIsBottom(inView);
  }, [inView, setIsBottom]);

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
      <BottomRef ref={ref} />
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

const BottomRef = styled.div`
  width: 100%;
  padding: 5px;
  opacity: 0;
`;

export default RoomList;
