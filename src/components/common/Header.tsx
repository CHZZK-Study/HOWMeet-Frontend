import ICONS from '@/constants/icons';
import styled from 'styled-components';

interface Props {
  title: string;
}

function Header({ title }: Props) {
  return (
    <HeeaderContainer>
      <img className="back-button" src={ICONS.nav.back} alt="back button" />
      <HeadTitle>{title}</HeadTitle>
    </HeeaderContainer>
  );
}

const HeeaderContainer = styled.div`
  width: 100%;
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  background: ${({ theme }) => theme.color.primary.white};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.04);

  border-bottom: 1px solid ${({ theme }) => theme.color.primary.white};

  .back-button {
    position: absolute;
    left: 25px;
    top: 17.63px;
    cursor: pointer;
  }
`;

const HeadTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

export default Header;
