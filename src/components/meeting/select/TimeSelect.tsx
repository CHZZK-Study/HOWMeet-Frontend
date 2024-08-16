import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TimeSlot, TimeTableProps } from '@/types/timeTableTypes';
import { useTimeSelectionLogic } from '@/hooks/useTimeSelectionLogic';
import TimeCell from '../common/TimeCell';

function TimeSelect({ data, dragDisabled = false }: TimeTableProps) {
  const { handleDragStart, handleDragMove, handleDragEnd, isSelected } =
    useTimeSelectionLogic();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;

    const preventScroll = (e: TouchEvent) => {
      if (!isScrolling) {
        e.preventDefault();
      }
    };

    const handleTouchStart = () => {
      isScrolling = false;
      container.addEventListener('touchmove', preventScroll, {
        passive: false,
      });
    };

    const handleTouchEnd = () => {
      isScrolling = true;
      container.removeEventListener('touchmove', preventScroll);
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  const renderCells = React.useMemo(() => {
    return data.hours.map((hour) => (
      <Row key={hour}>
        <HourCell>{hour}</HourCell>
        {data.days.map((day, index) => (
          <CellGroup key={`${hour}-${day}`}>
            {['00', '30'].map((minute) => {
              const timeSlot: TimeSlot = {
                hour,
                minute,
                day,
                date: data.dates[index],
                month: data.months[index],
              };
              return (
                <TimeCell
                  key={`${hour}-${day}-${minute}`}
                  timeSlot={timeSlot}
                  isSelected={isSelected(hour, minute, day)}
                  dragDisabled={dragDisabled}
                  onDragStart={handleDragStart}
                  onDragMove={handleDragMove}
                  onDragEnd={handleDragEnd}
                />
              );
            })}
          </CellGroup>
        ))}
      </Row>
    ));
  }, [
    data,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    isSelected,
    dragDisabled,
  ]);

  return <TableContainer ref={containerRef}>{renderCells}</TableContainer>;
}

export default TimeSelect;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
  padding: 0 15px 0 0px;
  height: 80%;
  touch-action: pan-y;
`;

const Row = styled.div`
  display: flex;
`;

const HourCell = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
`;

const CellGroup = styled.div`
  flex: 1;
  height: 40px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
`;
