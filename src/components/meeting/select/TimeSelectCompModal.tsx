import styled from 'styled-components';
import CloseIcon from 'public/assets/icons/common/close.svg'; // CloseIcon 임포트
import CheckIcon from 'public/assets/icons/form/check.svg';
import Button from '@/components/common/Button';

function TimeSelectModalComp({
  handleModalClose,
}: {
  handleModalClose: () => void;
}) {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <CloseButton onClick={handleModalClose}>
            <img src={CloseIcon} alt="Close" />
          </CloseButton>
        </ModalHeader>
        <img src={CheckIcon} alt="Check" />
        <ModalContentContainer>
          <ModalTitle>일정이 제출되었어요!</ModalTitle>
          <ModalContent>
            일정이 확정되면 <br />
            알림으로 빠르게 알려드릴게요! <br />
            잠시만 기다려주세요 :)
          </ModalContent>
        </ModalContentContainer>
        <Button $style="solid" onClick={handleModalClose}>
          확인
        </Button>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default TimeSelectModalComp;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  position: relative;

  width: 80%;
  max-width: 300px; // 최대 너비 설정
  height: 80%;

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
  text-align: center;
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 10px;
`;
