import styled from 'styled-components';

export const Title = styled.div`
  ${({ theme }) => theme.typo.body.regular[22]}
  letter-spacing: 0.02px;

  strong {
    font-weight: 700;
    color: ${({ theme }) => theme.color.point.green};
  }
`;

export const PageTitle = styled.div`
  ${({ theme }) => theme.typo.heading.bold[24]}
  white-space: pre-line;

  padding: 10px 12px 10px 0;
  margin-top: 20px;
`;

export const SubTitle = styled.div`
  color: ${({ theme }) => theme.color.primary.black};
  ${({ theme }) => theme.typo.body.semi_bold[18]};
  word-wrap: break-word;
`;
