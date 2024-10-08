import styled, { keyframes } from 'styled-components';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: Props) {
  const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <ModalOverlay onClick={(event) => closeModal(event)}>
      {children}
    </ModalOverlay>,
    document.getElementById('root') as HTMLElement
  );
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 24px;

  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.32);

  animation: ${fadeIn} 0.3s ease-in-out;

  z-index: 999;
`;

export default Modal;
