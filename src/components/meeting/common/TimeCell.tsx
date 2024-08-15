import React from 'react';
import styled from 'styled-components';
import { TimeSlot } from '@/types/ResultHeatmap';
import { CellProps } from '@/types/SelectedTime';

interface TimeCellProps {
  timeSlot: TimeSlot;
  isSelected: boolean;
  dragDisabled: boolean;
  onDragStart: (timeSlot: TimeSlot) => void;
  onDragMove: (timeSlot: TimeSlot) => void;
  onDragEnd: () => void;
}

function TimeCell({
  timeSlot,
  isSelected,
  dragDisabled,
  onDragStart,
  onDragMove,
  onDragEnd,
}: TimeCellProps) {
  return (
    <HalfCell
      selected={isSelected}
      onMouseDown={dragDisabled ? undefined : () => onDragStart(timeSlot)}
      onMouseEnter={dragDisabled ? undefined : () => onDragMove(timeSlot)}
      onMouseUp={dragDisabled ? undefined : onDragEnd}
      onTouchStart={dragDisabled ? undefined : () => onDragStart(timeSlot)}
      onTouchMove={
        dragDisabled
          ? undefined
          : (e: React.TouchEvent) => {
              const touch = e.touches[0];
              const element = document.elementFromPoint(
                touch.clientX,
                touch.clientY
              );
              if (element && element.getAttribute('data-timeslot')) {
                const touchedTimeSlot = JSON.parse(
                  element.getAttribute('data-timeslot') || '{}'
                );
                onDragMove(touchedTimeSlot);
              }
            }
      }
      onTouchEnd={dragDisabled ? undefined : onDragEnd}
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
