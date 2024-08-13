import Header from '@/components/common/Header';
import { Badge } from '@/styles/components/badge';
import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import { PageTitle } from '@/styles/components/text';
import styled from 'styled-components';

const mock = [
  {
    title: '마이팀 방',
    date: '2024. 07. 08 14:00~15:00',
    member: '김민석님 외 12명',
  },
  {
    title: '아자아자 방',
    date: '2024. 07. 09 12:00~16:00',
    member: '김민석님 외 12명',
  },
  {
    title: '마이팀 방',
    date: '2024. 07. 08 14:00~15:00',
    member: '김민석님 외 12명',
  },
  {
    title: '아자아자 방',
    date: '2024. 07. 09 12:00~16:00',
    member: '김민석님 외 12명',
  },
  {
    title: '마이팀 방',
    date: '2024. 07. 08 14:00~15:00',
    member: '김민석님 외 12명',
  },
  {
    title: '아자아자 방',
    date: '2024. 07. 09 12:00~16:00',
    member: '김민석님 외 12명',
  },
  {
    title: '마이팀 방',
    date: '2024. 07. 08 14:00~15:00',
    member: '김민석님 외 12명',
  },
  {
    title: '아자아자 방',
    date: '2024. 07. 09 12:00~16:00',
    member: '김민석님 외 12명',
  },
];

function MeetingListPage() {
  return (
    <FlexColContainer>
      <Header title="방 목록" />
      <ContentContainer>
        <Title>
          참여 중인 방 <span className="currentNumber">6</span>
        </Title>
        <RoomList>
          {mock.map((item) => (
            <RoomItem>
              <RoomTitle>{item.title}</RoomTitle>
              <RoomDesc>
                <Badge>예정된 일정</Badge>
                <p>{item.date}</p>
              </RoomDesc>
              <RoomDesc>
                <Badge>참여 중인 팀원</Badge>
                <p>{item.member}</p>
              </RoomDesc>
            </RoomItem>
          ))}
        </RoomList>
      </ContentContainer>
    </FlexColContainer>
  );
}

const Title = styled(PageTitle)`
  ${({ theme }) => theme.typo.heading.bold[22]}

  .currentNumber {
    color: ${({ theme }) => theme.color.point.green};
  }
`;

const RoomList = styled.ul`
  height: 50%;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const RoomItem = styled.li`
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

export default MeetingListPage;
