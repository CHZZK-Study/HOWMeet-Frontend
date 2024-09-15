import theme from '@/styles/theme';
import styled from 'styled-components';

interface ResultInfoCompProps {
  title: string;
  decidedTime: string;
  participants: string[];
}

function ResultInfoComp({
  title,
  decidedTime,
  participants,
}: ResultInfoCompProps) {
  return (
    <BackLayout>
      <Container>
        <Title>개발자 전체회의 일정</Title>
        <RoomInfo>
          {title} <GrayColLine />
          {decidedTime}
        </RoomInfo>
        <GrayRowLine />
        <GreenBadge>참여 가능 인원</GreenBadge>
        <Content>{participants.join(', ')}</Content>
      </Container>
    </BackLayout>
  );
}

export default ResultInfoComp;

export const BackLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: 20px;
`;
export const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${theme.color.primary.white};
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.04);
  gap: 10px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.color.secondary.solid.gray[800]};
`;

const RoomInfo = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 600;
`;

const GrayColLine = styled.div`
  width: 1px;
  height: 20px;
  background-color: ${theme.color.secondary.solid.gray[800]};
  margin: 0 10px;
`;

const GrayRowLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.color.secondary.solid.gray[800]};
  margin: 10px 0;
`;

const GreenBadge = styled.div`
  background-color: rgba(226, 245, 227, 1);
  padding: 5px 10px;
  border-radius: 8px;
  width: fit-content;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;
