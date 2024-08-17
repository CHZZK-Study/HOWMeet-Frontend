import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
  CellProps,
  TimeSlot,
  ResultHeatmapCellInfo,
} from '@/types/timeTableTypes';
import getAdjustedColor from '@/utils/meeting/timetable/getAdjustedColor';

interface ResultTimeCellProps {
  timeSlot: ResultHeatmapCellInfo;
  isSelected: boolean;
  dragDisabled: boolean;
  intensity: number;
  onDragStart: (timeSlot: TimeSlot) => void;
  onDragMove: (timeSlot: TimeSlot) => void;
  onDragEnd: () => void;
  onHover: (
    event: React.MouseEvent,
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
  onHover,
}: ResultTimeCellProps) {
  console.log('intensity: ', intensity);
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!dragDisabled) {
        e.preventDefault();
        onDragStart(timeSlot);
      }
    },
    [dragDisabled, onDragStart, timeSlot]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!dragDisabled) {
        e.preventDefault();
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.getAttribute('data-timeslot')) {
          const touchedTimeSlot = JSON.parse(
            element.getAttribute('data-timeslot') || '{}'
          );
          if (touchedTimeSlot.hour === timeSlot.hour) {
            onDragMove(touchedTimeSlot);
          }
        }
      }
    },
    [dragDisabled, onDragMove, timeSlot.hour]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      if (
        !dragDisabled &&
        e.buttons === 1 &&
        e.currentTarget.getAttribute('data-hour') === timeSlot.hour
      ) {
        onDragMove(timeSlot);
      }
    },
    [dragDisabled, onDragMove, timeSlot]
  );

  return (
    <ResultHalfCell
      selected={isSelected}
      intensity={intensity}
      onMouseDown={() => !dragDisabled && onDragStart(timeSlot)}
      onMouseEnter={handleMouseEnter}
      onMouseUp={onDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={onDragEnd}
      onMouseOver={(e) => onHover(e, timeSlot)}
      onMouseOut={() => onHover({} as React.MouseEvent, null)}
      data-timeslot={JSON.stringify(timeSlot)}
      data-hour={timeSlot.hour}
    />
  );
}

export default React.memo(ResultTimeCell);

const ResultHalfCell = styled.div<CellProps & { intensity: number }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => getAdjustedColor(props.intensity)};

  &:first-child {
    border-bottom: 1px dashed #ccc;
  }
  touch-action: none;
`;
