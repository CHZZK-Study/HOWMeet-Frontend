import styled from 'styled-components';
import { useLogOutModal } from '@/store/useModalStore';
import { useLogout } from '@/hooks/useLogout';
import BottomSheetHeader from './BottomSheetHeader';
import Button from '../common/Button';
import { BottomSheetContainer } from '../meeting/result/ResultBottomSheet';

function LogOut() {
  const { handleLogout } = useLogout();
  const closeLogOut = useLogOutModal((state) => state.close);

  return (
    <Container>
      <BottomSheetHeader title="로그아웃 하시겠습니까?" onClick={closeLogOut} />
      <ButtonContainer>
        <Button
          type="button"
          $style="solid"
          $theme="primary-purple"
          onClick={() => handleLogout()}
        >
          로그아웃
        </Button>
        <Button $style="solid" onClick={closeLogOut}>
          취소
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled(BottomSheetContainer)`
  height: 30%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  padding-top: 42px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export default LogOut;
