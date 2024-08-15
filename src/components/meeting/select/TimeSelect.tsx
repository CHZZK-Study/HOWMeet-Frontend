import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import styled from 'styled-components';
import { useTimeStore } from '@/store/meeting/timeStore';
import TimeTableLayout from '@/layouts/TimeTableLayout';
import { TimeSlot } from '@/types/ResultHeatmap';

interface CellProps {
  selected: boolean;
}
interface TimeTableProps {
  data: {
    hours: string[];
    days: string[];
    dates: string[];
    months: string[];
  };
  dragDisabled?: boolean;
}

function TimeSelect({ data, dragDisabled }: TimeTableProps) {
  const [isDragging, setIsDragging] = useState(false);
  // const [dragStartTime, setDragStartTime] = useState<TimeSlot | null>(null);
  const { selectedTimes, toggleTime } = useTimeStore();
  const lastToggledTimeSlot = useRef<string | null>(null);

  useEffect(() => {
    console.log(selectedTimes);
  }, [selectedTimes]);

  const handleDragStart = useCallback(
    (timeSlot: TimeSlot) => {
      setIsDragging(true);
      // setDragStartTime(timeSlot);
      toggleTime(timeSlot);
      lastToggledTimeSlot.current = JSON.stringify(timeSlot);
    },
    [toggleTime]
  );

  const handleDragMove = useCallback(
    (timeSlot: TimeSlot) => {
      if (isDragging) {
        const timeSlotString = JSON.stringify(timeSlot);
        if (lastToggledTimeSlot.current !== timeSlotString) {
          toggleTime(timeSlot);
          lastToggledTimeSlot.current = timeSlotString;
        }
      }
    },
    [isDragging, toggleTime]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    // setDragStartTime(null);
    lastToggledTimeSlot.current = null;
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

  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    document.body.addEventListener('touchmove', preventDefault, {
      passive: false,
    });
    return () => {
      document.body.removeEventListener('touchmove', preventDefault);
    };
  }, []);

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
                  onMouseDown={
                    dragDisabled ? undefined : () => handleDragStart(timeSlot)
                  }
                  onMouseEnter={
                    dragDisabled ? undefined : () => handleDragMove(timeSlot)
                  }
                  onMouseUp={dragDisabled ? undefined : handleDragEnd}
                  onTouchStart={
                    dragDisabled
                      ? undefined
                      : () => {
                          handleDragStart(timeSlot);
                        }
                  }
                  onTouchMove={
                    dragDisabled
                      ? undefined
                      : (e) => {
                          const touch = e.touches[0];
                          const element = document.elementFromPoint(
                            touch.clientX,
                            touch.clientY
                          );
                          if (
                            element &&
                            element.getAttribute('data-timeslot')
                          ) {
                            const touchedTimeSlot = JSON.parse(
                              element.getAttribute('data-timeslot') || '{}'
                            );
                            handleDragMove(touchedTimeSlot);
                          }
                        }
                  }
                  onTouchEnd={
                    dragDisabled
                      ? undefined
                      : () => {
                          handleDragEnd();
                        }
                  }
                  data-timeslot={JSON.stringify(timeSlot)}
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
