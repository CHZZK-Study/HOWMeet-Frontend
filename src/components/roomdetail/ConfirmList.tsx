import { Badge } from '@/styles/components/badge';
import { DateWrapper, List, ListItem } from '@/styles/components/room/List';

const mockConfirm = [
  {
    id: 1,
    title: '개발자 전체회의 일정',
    date: '2024.07.08 - 2024.07.14',
    notice: true,
  },
  {
    id: 2,
    title: '자유 스터디 일정',
    date: '2024.07.11 - 2024.07.17',
    notice: false,
  },
  {
    id: 3,
    title: '킥오프 일정',
    date: '2024.07.11 - 2024.07.17',
    notice: false,
  },
];

function ConfirmList() {
  return (
    <List>
      {mockConfirm.map((item) => (
        <ListItem>
          <h1 className="title">{item.title}</h1>
          <DateWrapper>
            <Badge>회의 시간</Badge>
            <p className="date">{item.date}</p>
          </DateWrapper>
        </ListItem>
      ))}
    </List>
  );
}

export default ConfirmList;
