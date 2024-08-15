import { useMemo } from 'react';
import styled from 'styled-components';
import TimeTableLayout from '@/layouts/TimeTableLayout';
import { TimeTableProps } from '@/types/SelectedTime';
import { TimeSlot } from '@/types/ResultHeatmap';
import { useTimeSelectionLogic } from '@/hooks/useTimeSelectionLogic';
import TimeCell from '../common/TimeCell';

function TimeSelect({ data, dragDisabled = false }: TimeTableProps) {
  const { handleDragStart, handleDragMove, handleDragEnd, isSelected } =
    useTimeSelectionLogic();

  const renderCells = useMemo(() => {
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
    isSelected,
    handleDragEnd,
    dragDisabled,
  ]);

  return <TimeTableLayout data={data} renderCells={renderCells} />;
}

export default TimeSelect;

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
