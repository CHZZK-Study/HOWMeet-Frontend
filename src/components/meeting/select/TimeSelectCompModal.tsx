import styled from 'styled-components';
import Button from '@/components/common/Button';
import theme from '@/styles/theme';
import { CheckIcon, CloseIcon } from 'public/assets/icons';

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
            <CloseIcon />
          </CloseButton>
        </ModalHeader>
        <CheckIcon />
        <ModalContentContainer>
          <ModalTitle>일정이 제출되었어요!</ModalTitle>
          <ModalContent>
            일정이 확정되면 <br />
            알림으로 빠르게 알려드릴게요! <br />
            잠시만 기다려주세요 :)
          </ModalContent>
        </ModalContentContainer>
        <ButtonContainer>
          <Button $style="solid" $theme="primary" onClick={handleModalClose}>
            확인
          </Button>
        </ButtonContainer>
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
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  position: relative;

  width: 80%;
  max-width: 300px;
  height: 80%;
  max-height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

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
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const CloseButton = styled.button`
  color: ${theme.color.secondary.solid.gray[800]};
  border: none;
  cursor: pointer;
  padding: 5px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;

  &:focus {
    outline: none;
  }
`;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1; // 여유 공간을 차지하여 버튼이 아래로 밀리게 함
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;
