import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CellProps, ResultTimeCellProps } from '@/types/timeTableTypes';
import getAdjustedColor from '@/utils/meeting/timetable/getAdjustedColor';
import theme from '@/styles/theme';
import { SelectHalfCell, SingleCell } from './SelectTimeCell';

function ResultTimeCell({
  timeSlot,
  isSelected,
  dragDisabled,
  disabled,
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

  if (disabled) {
    return <SingleCell ref={cellRef} className="disabled-cell" />;
  }

  return (
    <ResultHalfCell
      ref={cellRef}
      selected={isSelected}
      $intensity={intensity}
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
      $isEndCellHalf={isEndCellHalf}
      $isStartCellHalf={isStartCellHalf}
    />
  );
}

const MemoizedResultTimeCell = React.memo(ResultTimeCell);
export default MemoizedResultTimeCell;

const ResultHalfCell = styled(SelectHalfCell)<
  CellProps & { $intensity: number }
>`
  border-right: 0.1px solid ${theme.color.secondary.solid.gray[800]};
  border-left: 0.1px solid ${theme.color.secondary.solid.gray[800]};
  border-bottom: 0.1px solid ${theme.color.secondary.solid.gray[800]};

  background-color: ${({ $intensity }) =>
    getAdjustedColor({ ratio: $intensity })};

  ${({ selected }) =>
    selected &&
    `
    background-image: linear-gradient(
      45deg,
      ${theme.color.point.green} 25%,
      transparent 25%,
      transparent 50%,
      ${theme.color.point.green} 50%,
      ${theme.color.point.green} 75%,
      transparent 75%,
      transparent
    );
    background-size: 10px 10px;
  `};

  &:first-child {
    border-top: 0.1px solid ${theme.color.secondary.solid.gray[800]};
    border-bottom: ${({ $isStartCellHalf, $isEndCellHalf }) => {
      // if (selected) {
      //   return '1px solid white';
      // }
      if ($isStartCellHalf) {
        return 'none';
      }
      if ($isEndCellHalf) {
        return `0.1px solid ${theme.color.secondary.solid.gray[800]}`;
      }
      return `2px dashed #ccc`;
    }};
  }

  &:last-child {
    border-bottom: 0.1px solid ${theme.color.secondary.solid.gray[800]};
  }
`;
