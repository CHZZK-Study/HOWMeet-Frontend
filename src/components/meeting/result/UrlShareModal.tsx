import styled from 'styled-components';
import Button from '@/components/common/Button';
import { CloseIcon, UrlIcon } from 'public/assets/icons';

function UrlShareModal({ handleModalClose }: { handleModalClose: () => void }) {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <CloseButton onClick={handleModalClose}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>
        <ModalContentContainer>
          <ModalTitle>확정된 일정 공유하기</ModalTitle>

          <UrlIcon />
          <ModalTitle>URL 복사하기</ModalTitle>
        </ModalContentContainer>
        <Button $style="solid" onClick={handleModalClose}>
          취소
        </Button>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default UrlShareModal;

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
  flex: 1;
  gap: 20px;
`;

const ModalTitle = styled.h1`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;
