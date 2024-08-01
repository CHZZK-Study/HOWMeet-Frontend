import styled from 'styled-components';

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SelectWrapper = styled.ul<{ horizontal?: boolean }>`
  display: flex;
  flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
  gap: 8px;
`;

export const SelectableItem = styled.li`
  padding: 12px 14px;

  display: flex;
  flex: 1;
  justify-content: space-between;

  background: ${({ theme }) => theme.color.primary.white};
  border-radius: 12px;
  box-shadow: 0px 4px 10px 0px rgba(90, 90, 90, 0.1);
  cursor: pointer;
`;
