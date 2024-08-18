import BottomSheetHeader from '@/components/bottomsheet/BottomSheetHeader';
import Button from '@/components/common/Button';
import theme from '@/styles/theme';
import styled, { keyframes } from 'styled-components';

function ResultBottomSheet({
  TotalParticipants,
  currentParticipants,
  participatedUsers,
  unParticipatedUsers,
  onClose,
}: {
  TotalParticipants: number;
  currentParticipants: number;
  participatedUsers: string[];
  unParticipatedUsers: string[];
  onClose: () => void;
}) {
  const participatedUsersList = participatedUsers.join(', ');
  const unParticipatedUsersList = unParticipatedUsers.join(', ');

  return (
    <BottomSheetContainer>
      <BottomSheetHeader title="현재 참여 인원" onClick={onClose} />
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
        <ParticipantList participant>{participatedUsersList}</ParticipantList>
      </UserListContainer>
      <UserListContainer>
        <ParticipantIcon participant={false}>미참여</ParticipantIcon>
        <ParticipantList participant={false}>
          {unParticipatedUsersList}
        </ParticipantList>
      </UserListContainer>
      <Button $style="solid" onClick={onClose}>
        확인
      </Button>
    </BottomSheetContainer>
  );
}

export default ResultBottomSheet;

const colors = {
  participantText: '#4c545c',
  participantBackground: 'rgba(226, 245, 227, 1)',
  nonParticipantText: 'rgba(255, 114, 83, 0.3)',
  nonParticipantBackground: 'rgba(255, 114, 83, 0.3)',
};

const UserCountContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-right: 25px;
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
  margin-bottom: 20px;
`;

const ParticipantList = styled.div<{ participant: boolean }>`
  ${theme.typo.body.regular}
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
  height: 55vh;

  z-index: 1000;
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
