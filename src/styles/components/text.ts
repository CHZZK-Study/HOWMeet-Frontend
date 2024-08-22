import styled from 'styled-components';

export const Title = styled.h3`
  ${({ theme }) => theme.typo.body.regular[22]}
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
  letter-spacing: 0.02px;

  strong {
    font-weight: 700;
    color: ${({ theme }) => theme.color.point.green};
  }
`;

export const GuestTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};

  h2 {
    ${({ theme }) => theme.typo.heading.bold[24]}
  }

  span {
    ${({ theme }) => theme.typo.body.regular[16]}
  }
`;

export const PageTitle = styled.div`
  ${({ theme }) => theme.typo.heading.bold[24]}

  padding: 10px 12px 10px 0;
  margin-top: 20px;
`;

export const SubTitle = styled.div`
  color: ${({ theme }) => theme.color.primary.black};
  ${({ theme }) => theme.typo.body.semi_bold[18]};
  word-wrap: break-word;
`;
