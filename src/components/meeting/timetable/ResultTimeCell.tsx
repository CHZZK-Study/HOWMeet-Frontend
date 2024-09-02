import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CellProps, ResultTimeCellProps } from '@/types/timeTableTypes';
import getAdjustedColor from '@/utils/meeting/timetable/getAdjustedColor';
import theme from '@/styles/theme';
import { SelectHalfCell } from './SelectTimeCell';

function ResultTimeCell({
  timeSlot,
  isSelected,
  dragDisabled,
  intensity,
  onDragStart,
  onDragMove,
  onDragEnd,
  onCellInteraction,
  isEndCellHalf,
  isStartCellHalf,
}: ResultTimeCellProps) {
  const cellRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!dragDisabled) {
        e.preventDefault();
        onDragStart(timeSlot, e as unknown as React.TouchEvent);
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
          onDragMove(touchedTimeSlot, e as unknown as React.TouchEvent);
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

  return (
    <ResultHalfCell
      ref={cellRef}
      selected={isSelected}
      intensity={intensity}
      onMouseDown={(e) => !dragDisabled && onDragStart(timeSlot, e)}
      onMouseEnter={(e) =>
        !dragDisabled && e.buttons === 1 && onDragMove(timeSlot, e)
      }
      onMouseUp={onDragEnd}
      onMouseOver={(e) => onCellInteraction(e, timeSlot)}
      onMouseOut={() => onCellInteraction({} as React.MouseEvent, null)}
      onClick={(e) => onCellInteraction(e, timeSlot)}
      data-timeslot={JSON.stringify(timeSlot)}
      data-hour={timeSlot.hour}
      isEndCellHalf={isEndCellHalf}
      isStartCellHalf={isStartCellHalf}
    />
  );
}

const MemoizedResultTimeCell = React.memo(ResultTimeCell);
export default MemoizedResultTimeCell;

const ResultHalfCell = styled(SelectHalfCell)<
  CellProps & { intensity: number }
>`
  border-right: ${({ selected }) =>
    selected
      ? '2px solid white'
      : `0.1px solid ${theme.color.secondary.solid.gray[800]}`};
  border-left: ${({ selected }) =>
    selected
      ? '2px solid white'
      : `0.1px solid ${theme.color.secondary.solid.gray[800]}`};
  border-bottom: ${({ selected }) =>
    selected
      ? '2px solid white'
      : `0.1px solid ${theme.color.secondary.solid.gray[800]}`};
  border-top: ${({ selected }) => (selected ? '2px solid white' : 'none')};

  background-color: ${({ intensity }) =>
    getAdjustedColor({ ratio: intensity })};

  &:first-child {
    border-top: ${({ selected }) =>
      selected
        ? '2px solid white'
        : `0.1px solid ${theme.color.secondary.solid.gray[800]}`};
    border-bottom: ${({ selected, isStartCellHalf, isEndCellHalf }) => {
      if (selected) {
        return '2px solid white';
      }
      if (isStartCellHalf) {
        return 'none';
      }
      if (isEndCellHalf) {
        return `0.1px solid ${theme.color.secondary.solid.gray[800]}`;
      }
      return `2px dashed #ccc`;
    }};
  }
  
  &:last-child {
    border-bottom: ${({ selected }) =>
      selected
        ? '2px solid white'
        : `0.1px solid ${theme.color.secondary.solid.gray[800]}`};
`;
