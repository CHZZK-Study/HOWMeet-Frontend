import { PATH } from '@/constants/path';
import { Badge } from '@/styles/components/badge';
import { Schedule } from '@/types/room';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  name: string;
  member: string;
  roomId: string;
  schedule: Schedule;
}

function RoomItem({ name, member, roomId, schedule }: Props) {
  const navigate = useNavigate();

  return (
    <RoomItemContainer onClick={() => navigate(`${PATH.room}/${roomId}`)}>
      <NoticeDot />
      <RoomTitle>{name}</RoomTitle>
      <RoomDesc>
        <Badge>예정된 일정</Badge>
        {schedule ? (
          <p>
            {schedule.dates[0]} {schedule.time.startTime.slice(0, -3)}~
            {schedule.time.endTime.slice(0, -3)}
          </p>
        ) : (
          <p>없음</p>
        )}
      </RoomDesc>
      <RoomDesc>
        <Badge>참여 중인 팀원</Badge>
        <p>{member}</p>
      </RoomDesc>
    </RoomItemContainer>
  );
}

const RoomItemContainer = styled.li`
  position: relative;

  width: 100%;
  padding: 17px;

  display: flex;
  flex-direction: column;
  gap: 9px;

  background: ${({ theme }) => theme.color.primary.white};
  border-radius: 14.3px;

  box-shadow: 0px 4px 10px 0px rgba(90, 90, 90, 0.1);

  cursor: pointer;
`;

const RoomTitle = styled.p`
  ${({ theme }) => theme.typo.body.semi_bold[20]};
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
`;

const RoomDesc = styled.div`
  display: flex;
  gap: 8px;

  ${({ theme }) => theme.typo.body.medium[14]};
  color: ${({ theme }) => theme.color.secondary.solid.bk[700]};
`;

const NoticeDot = styled.div`
  position: absolute;
  top: 17px;
  right: 17px;

  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: ${({ theme }) => theme.color.secondary.solid.red.red};
`;

export default RoomItem;
