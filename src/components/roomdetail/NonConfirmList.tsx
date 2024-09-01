import { Badge } from '@/styles/components/badge';
import {
  DateWrapper,
  List,
  ListItem,
  NoticeDot,
} from '@/styles/components/room/List';
import styled from 'styled-components';

const mockNonConfirm = [
  {
    id: 1,
    title: '전체 회의 일정',
    date: '2024.07.08 - 2024.07.14',
    notice: true,
  },
  {
    id: 2,
    title: '프론트엔드 2차 회의 일정',
    date: '2024.07.11 - 2024.07.17',
    notice: false,
  },
];

function NonConfirmList() {
  return (
    <List>
      {mockNonConfirm.map((item) => (
        <NonConfirmListItem key={item.id}>
          <h1 className="title">{item.title}</h1>
          <DateWrapper>
            <Badge>예정된 일정 기간</Badge>
            <p className="date">{item.date}</p>
          </DateWrapper>
          {item.notice && <NoticeDot />}
        </NonConfirmListItem>
      ))}
    </List>
  );
}

const NonConfirmListItem = styled(ListItem)`
  position: relative;
`;

export default NonConfirmList;
