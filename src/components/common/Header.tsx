import { LeftArrowIcon, ShareIcon } from 'public/assets/icons';
import styled from 'styled-components';

interface Props {
  title: string;
  isShare?: boolean;
}

interface HeaderProps {
  isShare?: boolean;
}

function Header({ title, isShare }: Props) {
  return (
    <HeaderContainer>
      <LeftArrowIcon className="back-button" />
      <HeadTitle>{title}</HeadTitle>
      {isShare && <ShareIcon />}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div<HeaderProps>`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 좌우 정렬을 위해 space-between 사용 */
  padding: 0 16px; /* 좌우 패딩 설정 */

  background: ${({ theme }) => theme.color.primary.white};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid ${({ theme }) => theme.color.primary.white};

  .back-button {
    cursor: pointer;
  }
`;

const HeadTitle = styled.h1`
  ${({ theme }) => theme.typo.body.semi_bold[16]};
`;

export default Header;
