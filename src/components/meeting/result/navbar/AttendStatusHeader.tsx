import { useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import ResultBottomSheet from '../bottomsheet/ResultBottomSheet';

function AttendStatusHeader({
  TotalParticipants,
  currentParticipants,
  participatedUsers,
  unParticipatedUsers,
}: {
  TotalParticipants: number;
  currentParticipants: number;
  participatedUsers: string[];
  unParticipatedUsers: string[];
}) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const openBottomSheet = () => setIsBottomSheetOpen(true);
  const closeBottomSheet = () => setIsBottomSheetOpen(false);

  return (
    <>
      {TotalParticipants === currentParticipants ? (
        <AttendStatusHeaderContainer>
          <Title>모든 팀원 일정 조율 완료!</Title>
        </AttendStatusHeaderContainer>
      ) : (
        <AttendStatusHeaderContainer>
          <Title>일정 조율 중</Title>
          <AttendStatus>
            (현재 참여인원 : {TotalParticipants}명 중) 참여자
            <AttendParticipantCount onClick={openBottomSheet}>
              {currentParticipants}명
            </AttendParticipantCount>
          </AttendStatus>
        </AttendStatusHeaderContainer>
      )}
      {isBottomSheetOpen && (
        <ResultBottomSheet
          TotalParticipants={TotalParticipants}
          currentParticipants={currentParticipants}
          participatedUsers={participatedUsers}
          unParticipatedUsers={unParticipatedUsers}
          onClose={closeBottomSheet}
        />
      )}
    </>
  );
}

const AttendStatusHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Title = styled.div`
  ${theme.typo.heading.bold[20]}
`;

const AttendStatus = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const AttendParticipantCount = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
  color: #33c894;
  cursor: pointer;
`;

export default AttendStatusHeader;
