import { useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import ResultBottomSheet from './ResultBottomSheet';

function AttendStatusHeader({
  TotalPersonnel,
  currentParticipants,
  participatedPersonnel,
  unParticipatedPersonnel,
}: {
  TotalPersonnel: number;
  currentParticipants: number;
  participatedPersonnel: string[];
  unParticipatedPersonnel: string[];
}) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const openBottomSheet = () => setIsBottomSheetOpen(true);
  const closeBottomSheet = () => setIsBottomSheetOpen(false);

  return (
    <>
      {TotalPersonnel === currentParticipants ? (
        <AttendStatusHeaderContainer>
          <Title>모든 팀원 일정 조율 완료!</Title>
        </AttendStatusHeaderContainer>
      ) : (
        <AttendStatusHeaderContainer>
          <Title>일정 조율 중</Title>
          <GrayColLine />
          <AttendStatus>
            현재 참여인원
            <AttendParticipantContainer onClick={openBottomSheet}>
              {TotalPersonnel}명 중
              <AttendParticipantCount>
                {currentParticipants}명
              </AttendParticipantCount>
            </AttendParticipantContainer>
          </AttendStatus>
        </AttendStatusHeaderContainer>
      )}
      {isBottomSheetOpen && (
        <ResultBottomSheet
          TotalPersonnel={TotalPersonnel}
          currentParticipants={currentParticipants}
          participatedPersonnel={participatedPersonnel}
          unParticipatedPersonnel={unParticipatedPersonnel}
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

export const GrayColLine = styled.div`
  width: 1px;
  height: 20px;
  background-color: ${theme.color.primary.black};
  margin: 0 10px;
`;

export const AttendParticipantCount = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
  color: #33c894;
  cursor: pointer;
  border-radius: 13px;
`;

const AttendParticipantContainer = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
  cursor: pointer;
  border-radius: 13px;
  border: 1px solid #33c894;
  padding: 2px 5px;
`;

export default AttendStatusHeader;
