import { Badge } from '@/styles/components/badge';
import { DateWrapper, List, ListItem } from '@/styles/components/room/List';
import { Schedule } from '@/types/room';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  completedMeetings: Schedule[];
}

function ConfirmList({ completedMeetings }: Props) {
  const { roomId } = useParams();
  const navigate = useNavigate();

  return (
    <List>
      {completedMeetings.map((item) => (
        <ListItem
          onClick={() => navigate(`/meeting/${roomId}/result/${item.id}`)}
        >
          <h1 className="title">{item.name.value}</h1>
          <DateWrapper>
            <Badge>회의 시간</Badge>
            <p className="date">
              {item.confirmedDates[0]}{' '}
              {item.confirmedTime.startTime.slice(0, 5)} ~{' '}
              {item.confirmedTime.endTime.slice(0, 5)}
            </p>
          </DateWrapper>
        </ListItem>
      ))}
    </List>
  );
}

export default ConfirmList;
