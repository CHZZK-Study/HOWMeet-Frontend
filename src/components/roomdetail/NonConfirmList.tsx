import { Badge } from '@/styles/components/badge';
import {
  DateWrapper,
  List,
  ListItem,
  NoticeDot,
} from '@/styles/components/room/List';
import { Schedule } from '@/types/room';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  progressMeetings: Schedule[];
  isLeader: boolean;
}

function NonConfirmList({ progressMeetings, isLeader }: Props) {
  const navigate = useNavigate();
  const { roomId } = useParams();

  return (
    <List>
      {progressMeetings.map((item) => (
        <NonConfirmListItem
          key={item.id}
          onClick={() =>
            isLeader && item.isParticipant
              ? navigate(`/meeting/${roomId}/decision/${item.id}`)
              : navigate(`/meeting/${roomId}/select/${item.id}`)
          }
        >
          <h1 className="title">{item.name.value}</h1>
          <DateWrapper>
            <Badge>예정된 일정 기간</Badge>
            <p className="date">
              {item.dates[0]} ~ {item.dates[1]}
            </p>
          </DateWrapper>
          {item.isParticipant === false && <NoticeDot />}
        </NonConfirmListItem>
      ))}
    </List>
  );
}

const NonConfirmListItem = styled(ListItem)`
  position: relative;
  cursor: pointer;
`;

export default NonConfirmList;
