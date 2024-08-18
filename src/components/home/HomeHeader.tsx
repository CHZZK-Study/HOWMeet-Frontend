import { LogoTitleIcon, LogOutIcon } from 'public/assets/icons';
import styled from 'styled-components';

function HomeHeader() {
  return (
    <Header>
      <LogoTitleIcon />
      <LogOutIcon />
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
