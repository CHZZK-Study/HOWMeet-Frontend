import styled from 'styled-components';

function Attenders() {
  return (
    <StyledAttenders>
      강하람, 김민희, 김성희, 김찬수, 김태호, 노지우, 이다희, 이민서, 이보람,
      전채연, 정현규
    </StyledAttenders>
  );
}

const StyledAttenders = styled.div`
  padding: 17px;
  border-radius: 14px;
  background: ${({ theme }) => theme.color.primary.white};
  box-shadow: 0px 3.805px 10.559px 0px rgba(90, 90, 90, 0.1);
  color: ${({ theme }) => theme.color.secondary.solid.bk[700]};
  ${({ theme }) => theme.typo.body.regular[16]}
`;

export default Attenders;
