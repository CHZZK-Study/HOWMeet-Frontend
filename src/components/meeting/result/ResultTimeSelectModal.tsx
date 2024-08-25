import styled from 'styled-components';
import CloseIcon from 'public/assets/icons/common/close.svg'; // CloseIcon 임포트
import Button from '@/components/common/Button';
import { TimeSlot } from '@/types/timeTableTypes';
import theme from '@/styles/theme';

function ResultTimeSelectModal({
  handleModalClose,
  decidedTime,
}: {
  handleModalClose: () => void;
  decidedTime: TimeSlot[];
}) {
  const decidedDate = decidedTime[0].date;
  const startHour = decidedTime[0].hour;
  const startMinute = decidedTime[0].minute;
  const endHour = decidedTime[decidedTime.length - 1].hour;
  const endMinute = decidedTime[decidedTime.length - 1].minute;
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <CloseButton onClick={handleModalClose}>
            <img src={CloseIcon} alt="Close" />
          </CloseButton>
        </ModalHeader>
        <ModalContentContainer>
          <ModalTitle>일정을 확정하시겠습니까?</ModalTitle>
          <ModalContent>일정 확정 후 시간 변경은 어려워요!</ModalContent>
          <ModalRoomTitleAndCont>
            하우밋 방
            <GrayColLine />
            개발자 전체 회의 일정
          </ModalRoomTitleAndCont>
        </ModalContentContainer>
        <ModalDecisionTime>
          {decidedDate} {startHour}:{startMinute} ~ {endHour}:{endMinute}
        </ModalDecisionTime>
        <ButtonContainer>
          <Button $style="outlined" onClick={handleModalClose}>
            취소
          </Button>
          <Button $style="solid" onClick={handleModalClose}>
            확인
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default ResultTimeSelectModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: -50;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const GrayColLine = styled.div`
  width: 1px;
  height: 20px;
  background-color: ${theme.color.primary.black};
  margin: 0 10px;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  position: relative;

  width: 90%;
  max-width: 400px; // 최대 너비 설정
  height: 100%;

  display: flex;
  flex-direction: column;
  box-sizing: border-box; // 패딩 포함

  @media (min-width: 768px) {
    width: 50%;
    height: 50%;
  }

  @media (min-width: 1024px) {
    width: 30%;
    height: 50%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end; // 닫기 버튼을 오른쪽 끝에 배치
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 20px; // 아이콘 크기 조정
    height: 20px;
  }
`;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  padding: 20px;
`;

const ModalTitle = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 30px;
`;

const ModalRoomTitleAndCont = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 16px;
  font-weight: normal;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ModalDecisionTime = styled.div`
  text-align: center;
  font-size: 24px;
  color: ${theme.color.point.green};
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;
