import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  0% { transform: translateY(100%); }
  100% { transform: translateY(0); }
`;

export const BottomSheetContainer = styled.div`
  width: 100%;
  height: 80%;

  position: absolute;
  bottom: 0;

  margin-top: 22%;
  padding: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;

  border-radius: 20px 20px 0px 0px;
  background: ${({ theme }) => theme.color.primary.white};

  animation: ${slideIn} 240ms cubic-bezier(0.5, 0.1, 0.34, 1);
`;

export const BottomSheetInfoWrapper = styled.div`
  width: 100%;

  padding: 12px 14px;

  display: flex;
  gap: 8px;

  border-radius: 12px;
  background: ${({ theme }) => theme.color.secondary.solid.bk[50]};
`;

export const BottomSheetInfo = styled.p`
  ${({ theme }) => theme.typo.body.medium[14]};
  color: ${({ theme }) => theme.color.point.purple};
`;
