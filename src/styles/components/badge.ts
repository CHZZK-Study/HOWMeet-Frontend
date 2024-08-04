import styled from 'styled-components';

export const Badge = styled.div`
  width: fit-content;
  padding: 1.902px 7.61px;

  border-radius: 7.61px;
  background: ${({ theme }) => theme.color.secondary.solid.green[8]};

  color: ${({ theme }) => theme.color.secondary.solid.gray[800]};
  ${({ theme }) => theme.typo.body.semi_bold[12]}
  letter-spacing: -0.36px;
`;
