import { useLogOutModal } from '@/store/useModalStore';
import { LogoTitleIcon, LogOutIcon } from 'public/assets/icons';
import styled from 'styled-components';

function HomeHeader() {
  const openLogout = useLogOutModal((state) => state.open);

  return (
    <Header>
      <LogoTitleIcon width={140} height={22} />
      <LogOutIcon onClick={openLogout} />
    </Header>
  );
}

const Header = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;

  svg {
    cursor: pointer;
  }
`;
export default HomeHeader;
