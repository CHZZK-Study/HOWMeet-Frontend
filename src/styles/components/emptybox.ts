import styled from 'styled-components';

export const EmptyBox = styled.div<{ $height: string }>`
  width: 100%;
  height: ${({ $height }) => $height};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color.primary.white};
  border-radius: 14px;
  box-shadow: 0px 3.805px 10.559px 0px rgba(90, 90, 90, 0.1);
  color: ${({ theme }) => theme.color.secondary.solid.bk[500]};
  ${({ theme }) => theme.typo.body.regular[20]}
`;
