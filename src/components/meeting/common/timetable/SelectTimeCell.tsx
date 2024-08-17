import React, { useCallback, useEffect, useRef } from 'react';
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

  return (
    <SelectHalfCell
      ref={cellRef}
      selected={isSelected}
      onMouseDown={() => !dragDisabled && onDragStart(timeSlot)}
      onMouseEnter={(e) =>
        !dragDisabled && e.buttons === 1 && onDragMove(timeSlot)
      }
      onMouseUp={onDragEnd}
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
  border: 1px solid #ccc;
  background-color: ${(props) => (props.selected ? '#E2F5E3' : 'white')};
  &:first-child {
    border-bottom: 1px dashed #ccc;
  }
  touch-action: none;
`;
