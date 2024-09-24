import { CancelIcon, LeftArrowIcon, ShareIcon } from 'public/assets/icons';
import styled, { useTheme } from 'styled-components';

interface Props {
  title: string;
  isShare?: boolean;
  isClose?: boolean;
  onIconClick?: () => void;
}

function Header({ title, isShare = false, isClose, onIconClick }: Props) {
  const theme = useTheme();

  return (
    <HeaderContainer $isShare={isShare}>
      <LeftArrowIcon className="back-button" />
      <HeadTitle>{title}</HeadTitle>
      {isShare && <ShareIcon className="icon-button" />}
      {isClose && (
        <CancelIcon
          className="icon-button"
          fill={theme.color.secondary.solid.bk[700]}
          onClick={onIconClick}
        />
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div<{ $isShare: boolean }>`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: ${({ $isShare }) => ($isShare ? '' : 'center')};
  padding: 0 16px; /* 좌우 패딩 설정 */
  background: ${({ theme }) => theme.color.primary.white};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid ${({ theme }) => theme.color.primary.white};

  .back-button {
    position: absolute;
    left: 25px;
    top: 17.63px;
    cursor: pointer;
  }
  .icon-button {
    position: absolute;
    right: 25px;
    margin: auto 0;
    cursor: pointer;
  }
`;

const HeadTitle = styled.h1`
  ${({ theme }) => theme.typo.body.semi_bold[16]};
`;

export default Header;
