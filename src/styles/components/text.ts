import styled from 'styled-components';

export const Title = styled.div`
  font-size: 20px;
  font-style: normal;
  line-height: 140%;
  letter-spacing: 0.02px;

  strong {
    font-weight: 700;
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
