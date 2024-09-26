import { Badge } from '@/styles/components/badge';
import {
  DateWrapper,
  List,
  ListItem,
  NoticeDot,
} from '@/styles/components/room/List';
import { Schedule } from '@/types/room';
import styled from 'styled-components';

interface Props {
  progressMeetings: Schedule[];
}

function NonConfirmList({ progressMeetings }: Props) {
  return (
    <List>
      {progressMeetings.map((item) => (
        <NonConfirmListItem key={item.id}>
          <h1 className="title">{item.name.value}</h1>
          <DateWrapper>
            <Badge>예정된 일정 기간</Badge>
            <p className="date">
              {item.dates[0]} ~ {item.dates[1]}
            </p>
          </DateWrapper>
          <NoticeDot />
        </NonConfirmListItem>
      ))}
    </List>
  );
}

const NonConfirmListItem = styled(ListItem)`
  position: relative;
`;

export default NonConfirmList;
