import theme from '@/styles/theme';
import styled from 'styled-components';
import { GrayColLine } from './AttendStatusHeader';

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
          <TitleSpan>{title}</TitleSpan>
          <GrayColLine />
          <TimeSpan>
            {decidedTime.split('~')[0]}:00-{decidedTime.split('~')[1]}:00
          </TimeSpan>
        </RoomInfo>
        <GrayRowLine />
        <GreenBadge>참여 가능 인원</GreenBadge>
        <Content>{participants.join(', ')}</Content>
      </Container>
    </BackLayout>
  );
}

export default ResultInfoComp;

export const ExtendedBackLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100%);
  width: 100%;
  margin-top: 1.25rem;
  padding-bottom: 10rem;
  background-color: #f4f5f5;
`;

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
  padding: 2vw 2vw;
  background-color: ${theme.color.primary.white};
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.04);
  gap: 10px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${theme.color.secondary.solid.bk};
  padding-bottom: 10px;
  display: inline-block; /* 텍스트 크기에 맞춰 배경 크기 조절 */
  padding: 5px 5px;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(226, 245, 227, 1) 50%
  );
  width: fit-content;
  margin-bottom: 1rem;
`;

const RoomInfo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  font-size: 17px;
  font-weight: 500;
  gap: 10px; /* title과 시간 사이에 여유 공간 */
`;

const TitleSpan = styled.span`
  flex-grow: 1; /* 남는 공간을 타이틀에 할당 */
  overflow: hidden; /* 넘치는 텍스트는 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 ...으로 표시 */
`;

const TimeSpan = styled.span`
  white-space: nowrap; /* 시간이 줄바꿈 되지 않게 */
  flex-shrink: 0; /* 시간이 짤리지 않도록 */
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
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;
