import Button from '@/components/common/Button';
import {
  BottomSheetHeader,
  BottomSheetTitle,
} from '@/styles/components/bottomsheet/bottomsheet';
import theme from '@/styles/theme';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

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

  const participatedUsersList = participatedUsers.join(', ');
  const unParticipatedUsersList = unParticipatedUsers.join(', ');
  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  return (
    <>
      {TotalParticipants === currentParticipants ? (
        <AttendStatusHeaderContainer>
          <Title>모든 팀원 일정 조율 완료되었습니다!</Title>
        </AttendStatusHeaderContainer>
      ) : (
        <AttendStatusHeaderContainer>
          <Title>일정 조율 중</Title>
          <AttendStatus>
            (현재 참여인원 : {TotalParticipants}명 중) 참여자
            <AttendParticipantCount onClick={toggleBottomSheet}>
              {currentParticipants}명
            </AttendParticipantCount>
          </AttendStatus>
        </AttendStatusHeaderContainer>
      )}
      {isBottomSheetOpen && (
        <BottomSheetContainer>
          <BottomSheetHeader>
            <BottomSheetTitle>현재 참여 인원</BottomSheetTitle>
            <CloseButton onClick={toggleBottomSheet}>X</CloseButton>
          </BottomSheetHeader>
          <UserCountContainer>
            <UserState>
              총 참여 인원 :
              <ParticipantCount>{TotalParticipants}명</ParticipantCount>
            </UserState>
            <VerticalDivider />
            <UserState>참여 완료 : {currentParticipants}</UserState>
            <UserState>
              미참여 : {TotalParticipants - currentParticipants}
            </UserState>
          </UserCountContainer>
          <UserListContainer>
            <ParticipantIcon participant>참여 완료</ParticipantIcon>
            <ParticipantList participant>
              {participatedUsersList}
            </ParticipantList>
          </UserListContainer>
          <UserListContainer>
            <ParticipantIcon participant={false}>미참여</ParticipantIcon>
            <ParticipantList participant={false}>
              {unParticipatedUsersList}
            </ParticipantList>
          </UserListContainer>
          <Button $style="solid">일정 조율 완료</Button>
        </BottomSheetContainer>
      )}
    </>
  );
}

const colors = {
  participantText: '#4c545c',
  participantBackground: 'rgba(226, 245, 227, 1)',
  nonParticipantText: 'rgba(255, 114, 83, 0.3)',
  nonParticipantBackground: 'rgba(255, 114, 83, 0.3)',
};

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

const CloseButton = styled.button`
  font-size: 16px;
  font-weight: bold;
  color: #33c894;
  background: none;
  border: none;
  cursor: pointer;
`;
const UserCountContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #e0e0e0;
  margin: 0 15px;
`;

const UserState = styled.div`
  font-size: 19px;
  display: flex;
  align-items: center;
`;

const ParticipantCount = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
`;
const UserListContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  flex-direction: column;
  margin: 15px;
`;

const ParticipantList = styled.div<{ participant: boolean }>`
  font-size: 14px;
  font-weight: bold;
  color: ${(props) =>
    props.participant ? colors.participantText : colors.nonParticipantText};
`;

const ParticipantIcon = styled.div<{ participant: boolean }>`
  background-color: ${(props) =>
    props.participant
      ? colors.participantBackground
      : colors.nonParticipantBackground};
  border-radius: 40px;
  padding: 5px 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${colors.participantText};
  font-weight: bold;
  font-size: 13px;
  min-width: 30px;
  max-width: 100px;
`;

const slideIn = keyframes`
  0% { transform: translateY(100%); }
  100% { transform: translateY(0); }
`;

export const BottomSheetContainer = styled.div`
  width: 100%;
  height: 50vh;

  position: absolute;
  bottom: 0;

  margin-top: 22%;
  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  border-radius: 20px 20px 0px 0px;
  background: ${theme.color.primary.white};

  animation: ${slideIn} 240ms cubic-bezier(0.5, 0.1, 0.34, 1);
`;
export default AttendStatusHeader;
