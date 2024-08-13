import styled from 'styled-components';
import CloseIcon from 'public/assets/icons/common/close.svg';

interface Props {
  title: string;
  onClick: () => void;
}

function BottomSheetHeader({ title, onClick }: Props) {
  return (
    <Header>
      <Title>{title}</Title>
      <button type="button" onClick={onClick}>
        <img src={CloseIcon} alt="close" />
      </button>
    </Header>
  );
}

export const Header = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    cursor: pointer;
  }
`;

export const Title = styled.div`
  ${({ theme }) => theme.typo.body.semi_bold[22]}
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
`;

export default BottomSheetHeader;
