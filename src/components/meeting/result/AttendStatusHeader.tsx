import styled from 'styled-components';

function AttendStatusHeader({
  TotalParticipants,
  currentParticipants,
}: {
  TotalParticipants: number;
  currentParticipants: number;
}) {
  return (
    <AttendStatusHeaderContainer>
      <Title>일정 조율 중</Title>
      <AttendStatus>
        (현재 참여인원 : {TotalParticipants}명 중) 참여자
        <AttendParticipantCount>{currentParticipants}명</AttendParticipantCount>
      </AttendStatus>
    </AttendStatusHeaderContainer>
  );
}

const AttendStatusHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const AttendStatus = styled.div`
  display: flex;
  align-items: center;
`;

const AttendParticipantCount = styled.div`
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #33c894;
`;

export default AttendStatusHeader;
