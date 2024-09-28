import Button from '@/components/common/Button';
import { CloseIcon } from 'public/assets/icons';
import styled, { useTheme } from 'styled-components';
import { useQuitMakeMeetingModal } from '@/store/useModalStore';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';

function QuitMakeMeetingModal() {
  const theme = useTheme();
  const closeQuit = useQuitMakeMeetingModal((state) => state.close);
  const navigate = useNavigate();

  return (
    <QuitMakeMeetingModalContainer>
      <CloseIcon
        className="close-icon"
        fill={theme.color.secondary.solid.bk[400]}
        onClick={closeQuit}
      />
      <Title>일정 만들기를 중단하시겠어요?</Title>
      <ButtonContainer>
        <Button $style="solid" onClick={closeQuit}>
          계속 진행
        </Button>
        <Button
          $style="solid"
          $theme="primary-purple"
          onClick={() => navigate(PATH.login)}
        >
          중단하기
        </Button>
      </ButtonContainer>
    </QuitMakeMeetingModalContainer>
  );
}
const QuitMakeMeetingModalContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 22px 24px 42px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  border-radius: 20px;
  background: ${({ theme }) => theme.color.primary.white};

  .close-icon {
    position: absolute;
    top: 22px;
    right: 24px;
    cursor: pointer;
  }
`;

const Title = styled.h2`
  margin-top: 76px;
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
  ${({ theme }) => theme.typo.body.semi_bold[20]};
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

export default QuitMakeMeetingModal;
