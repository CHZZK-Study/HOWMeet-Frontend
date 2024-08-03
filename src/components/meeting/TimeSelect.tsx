import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTimeStore } from '@/store/meeting/timeStore';

interface CellProps {
  selected: boolean;
}

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
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

const HalfCell = styled.div<CellProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.selected ? '#41D335' : 'white')};
  &:first-child {
    border-bottom: 1px dashed #ccc;
  }
`;

const DateCell = styled.div`
  flex: 1;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MonthCell = styled.div`
  flex: 1;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface TimeSlot {
  hour: string;
  minute: string;
  day: string;
  date: string;
  month: string;
}

interface TimeTableProps {
  data: {
    hours: string[];
    days: string[];
    dates: string[];
    months: string[];
  };
}

function TimeSelect({ data }: TimeTableProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartTime, setDragStartTime] = useState<TimeSlot | null>(null);
  const { selectedTimes, toggleTime } = useTimeStore();

  const handleMouseDown = useCallback(
    (timeSlot: TimeSlot) => {
      setIsDragging(true);
      setDragStartTime(timeSlot);
      toggleTime(timeSlot);
    },
    [toggleTime]
  );

  const handleMouseEnter = useCallback(
    (timeSlot: TimeSlot) => {
      if (isDragging) {
        toggleTime(timeSlot);
      }
    },
    [isDragging, toggleTime]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStartTime(null);
  }, []);

  const isSelected = useCallback(
    (hour: string, minute: string, day: string): boolean => {
      return selectedTimes.some(
        (time) =>
          time.hour === hour && time.minute === minute && time.day === day
      );
    },
    [selectedTimes]
  );

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
                <HalfCell
                  key={`${hour}-${day}-${minute}`}
                  selected={isSelected(hour, minute, day)}
                  onMouseDown={() => handleMouseDown(timeSlot)}
                  onMouseEnter={() => handleMouseEnter(timeSlot)}
                />
              );
            })}
          </CellGroup>
        ))}
      </Row>
    ));
  }, [data, handleMouseDown, handleMouseEnter, isSelected]);

  return (
    <TableContainer onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <Header>
        <HourCell />
        {data.months.map((month, index) => (
          <MonthCell key={`month-${index}`}>{month}</MonthCell>
        ))}
      </Header>
      <Header>
        <HourCell />
        {data.days.map((day, index) => (
          <DateCell key={`day-${index}`}>{day}</DateCell>
        ))}
      </Header>
      {renderCells}
    </TableContainer>
  );
}

export default TimeSelect;
