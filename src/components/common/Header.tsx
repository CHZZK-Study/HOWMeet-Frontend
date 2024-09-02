import { LeftArrowIcon, ShareIcon } from 'public/assets/icons';
import styled from 'styled-components';
import ToolTip from '../meeting/select/HeaderToolTip';

interface Props {
  title: string;
  isShare?: boolean;
  toggle?: () => void;
  isVisible?: boolean;
}

interface HeaderProps {
  isShare?: boolean;
}

function Header({ title, isShare, isVisible, toggle }: Props) {
  return (
    <HeaderContainer isShare={isShare}>
      <LeftArrowIcon className="back-button" />
      <HeadTitle>{title}</HeadTitle>
      {isShare && (
        <>
          <ShareIcon className="share-button" />
          {isVisible && (
            <ToolTip
              content="팀원에게 공유해서 함께 일정을 조율해보세요!"
              toggle={toggle as () => void}
            />
          )}
        </>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div<HeaderProps>`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  background: ${({ theme }) => theme.color.primary.white};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid ${({ theme }) => theme.color.primary.white};

  .back-button {
    position: absolute;
    left: 25px;
    top: 17.63px;
    cursor: pointer;
  }
  .share-button {
    position: absolute;
    right: 25px;
    top: 17.63px;
    cursor: pointer;
  }
`;

const HeadTitle = styled.h1`
  ${({ theme }) => theme.typo.body.semi_bold[16]};
`;

export default Header;
