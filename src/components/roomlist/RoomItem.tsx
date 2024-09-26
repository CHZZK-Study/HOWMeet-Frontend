import { Badge } from '@/styles/components/badge';
import styled from 'styled-components';

interface Props {
  name: string;
  member: string;
  schedule: {
    id: string;
    dates: string[];
    time: {
      startTime: string;
      endTime: string;
    };
    name: {
      value: string;
    };
    status: string;
  };
}

function RoomItem({ name, member, schedule }: Props) {
  return (
    <RoomItemContainer>
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
          <p>예정된 일정이 없습니다</p>
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
