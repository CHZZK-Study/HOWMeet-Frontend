import styled from 'styled-components';
import Button from '@/components/common/Button';
import { CloseIcon, UrlIcon } from 'public/assets/icons';
import {
  CloseButton,
  ModalContainer,
  ModalOverlay,
  ModalTitle,
} from '../select/TimeSelectCompModal';

function UrlShareModal({ handleModalClose }: { handleModalClose: () => void }) {
  const handleUrlCopy = () => {
    navigator.clipboard.writeText(window.location.href);
  };

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
          <UrlIcon onClick={handleUrlCopy} />
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

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end; // 닫기 버튼을 오른쪽 끝에 배치
  align-items: center;
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
