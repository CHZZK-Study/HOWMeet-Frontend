import { Badge } from '@/styles/components/badge';
import styled from 'styled-components';

interface Props {
  title: string;
  date: string;
  member: string;
}

function RoomItem({ title, date, member }: Props) {
  return (
    <RoomItemContainer>
      <NoticeDot />
      <RoomTitle>{title}</RoomTitle>
      <RoomDesc>
        <Badge>예정된 일정</Badge>
        <p>{date}</p>
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
