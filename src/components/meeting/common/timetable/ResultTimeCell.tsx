import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CellProps, ResultHeatmapCellInfo } from '@/types/timeTableTypes';
import getAdjustedColor from '@/utils/meeting/timetable/getAdjustedColor';

interface ResultTimeCellProps {
  timeSlot: ResultHeatmapCellInfo;
  isSelected: boolean;
  dragDisabled: boolean;
  intensity: number;
  onDragStart: (
    timeSlot: ResultHeatmapCellInfo,
    event: React.MouseEvent | React.TouchEvent
  ) => void;
  onDragMove: (
    timeSlot: ResultHeatmapCellInfo,
    event: React.MouseEvent | React.TouchEvent
  ) => void;
  onDragEnd: () => void;
  onCellInteraction: (
    event: React.MouseEvent | React.TouchEvent,
    slot: ResultHeatmapCellInfo | null
  ) => void;
}

function ResultTimeCell({
  timeSlot,
  isSelected,
  dragDisabled,
  intensity,
  onDragStart,
  onDragMove,
  onDragEnd,
  onCellInteraction,
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
    />
  );
}

const MemoizedResultTimeCell = React.memo(ResultTimeCell);
export default MemoizedResultTimeCell;

const ResultHalfCell = styled.div<CellProps & { intensity: number }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${(props) => (props.selected ? '2px solid white' : '1px solid #ccc')};
  background-color: ${(props) => getAdjustedColor({ ratio: props.intensity })};
  &:first-child {
    border-bottom: ${(props) =>
      props.selected ? '2px solid white' : '1px dashed #ccc;'};
  }
  touch-action: none;
  user-select: none;
`;
