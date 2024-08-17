import React, { useCallback } from 'react';
import styled from 'styled-components';
import { CellProps, TimeSlot } from '@/types/timeTableTypes';

interface SelectTimeCellProps {
  timeSlot: TimeSlot;
  isSelected: boolean;
  dragDisabled: boolean;
  onDragStart: (timeSlot: TimeSlot) => void;
  onDragMove: (timeSlot: TimeSlot) => void;
  onDragEnd: () => void;
}

function SelectTimeCell({
  timeSlot,
  isSelected,
  dragDisabled,
  onDragStart,
  onDragMove,
  onDragEnd,
}: SelectTimeCellProps) {
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
          onDragMove(touchedTimeSlot);
        }
      }
    },
    [dragDisabled, onDragMove]
  );

  return (
    <SelectHalfCell
      selected={isSelected}
      onMouseDown={() => !dragDisabled && onDragStart(timeSlot)}
      onMouseEnter={(e) =>
        !dragDisabled && e.buttons === 1 && onDragMove(timeSlot)
      }
      onMouseUp={onDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={onDragEnd}
      data-timeslot={JSON.stringify(timeSlot)}
    />
  );
}

export default React.memo(SelectTimeCell);

const SelectHalfCell = styled.div<CellProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.selected ? '#E2F5E3' : 'white')};
  &:first-child {
    border-bottom: 1px dashed #ccc;
  }
  touch-action: none;
`;
