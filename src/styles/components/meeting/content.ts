import styled from 'styled-components';

export const ContentWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
`;

export const ContentTitle = styled.div`
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
  ${({ theme }) => theme.typo.body.medium[16]}
`;

export const ContentDescription = styled.div`
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
  ${({ theme }) => theme.typo.body.semi_bold[16]}
`;
