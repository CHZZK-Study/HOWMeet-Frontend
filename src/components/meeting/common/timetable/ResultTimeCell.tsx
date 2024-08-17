import React, { useCallback } from 'react';
import styled from 'styled-components';
import { CellProps, ResultHeatmapCellInfo } from '@/types/timeTableTypes';
import getAdjustedColor from '@/utils/meeting/timetable/getAdjustedColor';

interface ResultTimeCellProps {
  timeSlot: ResultHeatmapCellInfo;
  isSelected: boolean;
  dragDisabled: boolean;
  intensity: number;
  onDragStart: () => void;
  onDragMove: () => void;
  onDragEnd: () => void;
  onHover: (
    event: React.MouseEvent | null,
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
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!dragDisabled) {
        e.preventDefault();
        onDragStart();
      }
    },
    [dragDisabled, onDragStart]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!dragDisabled) {
        e.preventDefault();
        onDragMove();
      }
    },
    [dragDisabled, onDragMove]
  );

  const handleMouseDown = useCallback(() => {
    if (!dragDisabled) {
      onDragStart();
    }
  }, [dragDisabled, onDragStart]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      if (!dragDisabled && e.buttons === 1) {
        onDragMove();
      }
    },
    [dragDisabled, onDragMove]
  );

  return (
    <ResultHalfCell
      selected={isSelected}
      intensity={intensity}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={onDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={onDragEnd}
      onMouseOver={(e) => onHover(e, timeSlot)}
      onMouseOut={() => onHover(null, null)}
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
  border: ${(props) =>
    props.selected ? '1.5px solid #000' : '1px solid #ccc'};
  background-color: ${(props) => getAdjustedColor({ ratio: props.intensity })};
  &:first-child {
    border-bottom: 1px dashed #ccc;
  }
  touch-action: none;
`;
