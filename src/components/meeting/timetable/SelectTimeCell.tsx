import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CellProps, SelectTimeCellProps } from '@/types/timeTableTypes';
import theme from '@/styles/theme';

function SelectTimeCell({
  timeSlot,
  isSelected,
  dragDisabled,
  onDragStart,
  onDragMove,
  onDragEnd,
  isStartCellHalf,
  isEndCellHalf,
  disabled,
}: SelectTimeCellProps) {
  const cellRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!dragDisabled) {
        e.preventDefault();
        onDragStart(timeSlot);
      }
    },
    [dragDisabled, onDragStart, timeSlot]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!dragDisabled) {
        e.preventDefault();
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.getAttribute('data-timeslot')) {
          const touchedTimeSlot = JSON.parse(
            element.getAttribute('data-timeslot') || '{}'
          );
          onDragMove(touchedTimeSlot);
        }
      }
    },
    [dragDisabled, onDragMove]
  );

  useEffect(() => {
    const cell = cellRef.current;
    if (cell) {
      cell.addEventListener('touchstart', handleTouchStart, { passive: false });
      cell.addEventListener('touchmove', handleTouchMove, { passive: false });
      cell.addEventListener('touchend', onDragEnd, { passive: false });
    }

    return () => {
      if (cell) {
        cell.removeEventListener('touchstart', handleTouchStart);
        cell.removeEventListener('touchmove', handleTouchMove);
        cell.removeEventListener('touchend', onDragEnd);
      }
    };
  }, [handleTouchStart, handleTouchMove, onDragEnd]);

  if (disabled) {
    return <SingleCell ref={cellRef} className="disabled-cell" />;
  }

  return (
    <SelectHalfCell
      ref={cellRef}
      selected={isSelected}
      onMouseDown={() => !dragDisabled && onDragStart(timeSlot)}
      onMouseEnter={(e) =>
        !dragDisabled && e.buttons === 1 && onDragMove(timeSlot)
      }
      data-timeslot={JSON.stringify(timeSlot)}
      onMouseUp={onDragEnd}
      $isEndCellHalf={isEndCellHalf}
      $isStartCellHalf={isStartCellHalf}
    />
  );
}
const MemoizedSelectTimeCell = React.memo(SelectTimeCell);
export default MemoizedSelectTimeCell;

export const SelectHalfCell = styled.div<CellProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 0.1px solid ${theme.color.secondary.solid.gray[800]};
  border-left: 0.1px solid ${theme.color.secondary.solid.gray[800]};
  background-color: ${(props) => (props.selected ? '#E2F5E3' : 'white')};
  &:first-child {
    ${({ $isStartCellHalf, $isEndCellHalf }) => {
      if ($isStartCellHalf) {
        return null;
      }
      if ($isEndCellHalf) {
        return `border-bottom: 0.1px solid ${theme.color.secondary.solid.gray[800]};`;
      }
      return `border-bottom: 2px dashed #ccc;`;
    }}
    border-top: 0.1px solid ${theme.color.secondary.solid.gray[800]};
  }
  &:last-child {
    border-bottom: 0.1px solid ${theme.color.secondary.solid.gray[800]};
  }
  touch-action: none;
`;

export const SingleCell = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1px solid ${theme.color.secondary.solid.gray[800]};
  background: linear-gradient(
    135deg,
    rgba(255, 182, 193, 0.5) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 182, 193, 0.5) 50%,
    rgba(255, 182, 193, 0.5) 75%,
    transparent 75%,
    transparent
  );
  background-size: 20px 20px; // 조정 가능
  touch-action: none;
`;
