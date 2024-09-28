import { Badge } from '@/styles/components/badge';
import { DateWrapper, List, ListItem } from '@/styles/components/room/List';
import { Schedule } from '@/types/room';

interface Props {
  completedMeetings: Schedule[];
}

function ConfirmList({ completedMeetings }: Props) {
  return (
    <List>
      {completedMeetings.map((item) => (
        <ListItem>
          <h1 className="title">{item.name.value}</h1>
          <DateWrapper>
            <Badge>회의 시간</Badge>
            <p className="date">{item.dates[0]}</p>
          </DateWrapper>
        </ListItem>
      ))}
    </List>
  );
}

export default ConfirmList;
