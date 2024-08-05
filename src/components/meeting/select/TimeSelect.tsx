// import React, { useCallback, useMemo, useState } from 'react';
// import styled from 'styled-components';
// import { useTimeStore } from '@/store/meeting/timeStore';

// interface TimeSlot {
//   hour: string;
//   minute: string;
//   day: string;
//   date: string;
//   month: string;
// }

// interface TimeTableProps {
//   data: {
//     hours: string[];
//     days: string[];
//     dates: string[];
//     months: string[];
//   };
// }

// function TimeSelect({ data }: TimeTableProps) {
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStartTime, setDragStartTime] = useState<TimeSlot | null>(null);
//   const { selectedTimes, toggleTime } = useTimeStore();

//   const handleMouseDown = useCallback(
//     (timeSlot: TimeSlot) => {
//       setIsDragging(true);
//       setDragStartTime(timeSlot);
//       toggleTime(timeSlot);
//     },
//     [toggleTime]
//   );

//   const handleMouseEnter = useCallback(
//     (timeSlot: TimeSlot) => {
//       if (isDragging) {
//         toggleTime(timeSlot);
//       }
//     },
//     [isDragging, toggleTime]
//   );

//   const handleMouseUp = useCallback(() => {
//     setIsDragging(false);
//     setDragStartTime(null);
//   }, []);

//   const isSelected = useCallback(
//     (hour: string, minute: string, day: string): boolean => {
//       return selectedTimes.some(
//         (time) =>
//           time.hour === hour && time.minute === minute && time.day === day
//       );
//     },
//     [selectedTimes]
//   );

//   const renderCells = useMemo(() => {
//     return data.hours.map((hour) => (
//       <Row key={hour}>
//         <HourCell>{hour}</HourCell>
//         {data.days.map((day, index) => (
//           <CellGroup key={`${hour}-${day}`}>
//             {['00', '30'].map((minute) => {
//               const timeSlot: TimeSlot = {
//                 hour,
//                 minute,
//                 day,
//                 date: data.dates[index],
//                 month: data.months[index],
//               };
//               return (
//                 <HalfCell
//                   key={`${hour}-${day}-${minute}`}
//                   selected={isSelected(hour, minute, day)}
//                   onMouseDown={() => handleMouseDown(timeSlot)}
//                   onMouseEnter={() => handleMouseEnter(timeSlot)}
//                 />
//               );
//             })}
//           </CellGroup>
//         ))}
//       </Row>
//     ));
//   }, [data, handleMouseDown, handleMouseEnter, isSelected]);

//   return (
//     <TableContainer onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
//       <Header>
//         <HourCell />
//         {data.months.map((month, index) => (
//           <MonthCell key={`month-${index}`}>{month}</MonthCell>
//         ))}
//       </Header>
//       <Header>
//         <HourCell />
//         {data.days.map((day, index) => (
//           <DateCell key={`day-${index}`}>{day}</DateCell>
//         ))}
//       </Header>
//       {renderCells}
//     </TableContainer>
//   );
// }

// export default TimeSelect;

// const TableContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   user-select: none;
//   width: 100%;
//   overflow-x: auto;
//   margin-bottom: 20px;
//   padding: 0 15px;
// `;

// const Header = styled.div`
//   display: flex;
// `;

// const Row = styled.div`
//   display: flex;
// `;

// const HourCell = styled.div`
//   width: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   padding-right: 10px;
// `;

// const CellGroup = styled.div`
//   flex: 1;
//   height: 40px;
//   border: 1px solid #ccc;
//   display: flex;
//   flex-direction: column;
// `;

// const HalfCell = styled.div<CellProps>`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: ${(props) => (props.selected ? '#E2F5E3' : 'white')};
//   &:first-child {
//     border-bottom: 1px dashed #ccc;
//   }
// `;

// const DateCell = styled.div`
//   flex: 1;
//   height: 30px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const MonthCell = styled.div`
//   flex: 1;
//   height: 30px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// components/TimeSelect.tsx

import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTimeStore } from '@/store/meeting/timeStore';
import TimeTableLayout from '@/layouts/TimeTableLayout';

interface CellProps {
  selected: boolean;
}

interface TimeSlot {
  hour: string;
  minute: string;
  day: string;
  date: string;
  month: string;
}

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
                  onMouseUp={handleMouseUp}
                />
              );
            })}
          </CellGroup>
        ))}
      </Row>
    ));
  }, [data, handleMouseDown, handleMouseEnter, isSelected, handleMouseUp]);

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
