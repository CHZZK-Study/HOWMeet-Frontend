import React from 'react';
import styled from 'styled-components';
import { CellProps, TimeSlot } from '@/types/timeTableTypes';

interface TimeCellProps {
  timeSlot: TimeSlot;
  isSelected: boolean;
  dragDisabled: boolean;
  onDragStart: (timeSlot: TimeSlot) => void | undefined;
  onDragMove: (timeSlot: TimeSlot) => void | undefined;
  onDragEnd: () => void | undefined;
}

function TimeCell({
  timeSlot,
  isSelected,
  dragDisabled,
  onDragStart,
  onDragMove,
  onDragEnd,
}: TimeCellProps) {
  const handleMouseDown = () => {
    if (!dragDisabled) {
      onDragStart(timeSlot);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!dragDisabled && e.buttons === 1) {
      onDragMove(timeSlot);
    }
  };

  const handleTouchStart = () => {
    if (!dragDisabled) {
      onDragStart(timeSlot);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragDisabled) {
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element && element.getAttribute('data-timeslot')) {
        const touchedTimeSlot = JSON.parse(
          element.getAttribute('data-timeslot') || '{}'
        );
        onDragMove(touchedTimeSlot);
      }
    }
  };

  return (
    <HalfCell
      selected={isSelected}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={onDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={onDragEnd}
      data-timeslot={JSON.stringify(timeSlot)}
    />
  );
}

export default TimeCell;

const HalfCell = styled.div<CellProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.selected ? '#E2F5E3' : 'white')};
  &:first-child {
    border-bottom: 1px dashed #ccc;
  }
`;
