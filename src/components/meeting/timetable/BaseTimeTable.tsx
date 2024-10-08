import { TimeTableData } from '@/types/timeTableTypes';
import React from 'react';
import styled from 'styled-components';

interface BaseTimeTableProps {
  data: TimeTableData;
  renderCell: (
    hour: string,
    date: string,
    minute: string,
    isStartCellHalf: boolean,
    isEndCellHalf: boolean
  ) => React.ReactNode;
}

function BaseTimeTable({ data, renderCell }: BaseTimeTableProps) {
  return (
    <TableContainer>
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
      {data.hours.map((hour, hourIndex) => (
        <React.Fragment key={`hour-${hour}`}>
          <Row>
            <HourContainer>
              {hourIndex === 0 && data.isStartHalfMinute ? null : (
                <HourCell>{hour}:00</HourCell>
              )}
              {hourIndex === data.hours.length - 1 &&
              data.isEndHalfMinute ? null : (
                <HourCell>{hour}:30</HourCell>
              )}
            </HourContainer>
            {data.dates.map((date) => (
              <CellGroup
                key={`${hour}-${date}`}
                $isHalf={
                  (hourIndex === 0 && data.isStartHalfMinute) ||
                  (hourIndex === data.hours.length - 1 && data.isEndHalfMinute)
                }
              >
                {hourIndex === 0 && data.isStartHalfMinute
                  ? null
                  : renderCell(
                      hour,
                      date,
                      '00',
                      hourIndex === 0 && data.isStartHalfMinute,
                      hourIndex === data.hours.length - 1 &&
                        data.isEndHalfMinute
                    )}

                {hourIndex === data.hours.length - 1 && data.isEndHalfMinute
                  ? null
                  : renderCell(
                      hour,
                      date,
                      '30',
                      hourIndex === 0 && data.isStartHalfMinute,
                      hourIndex === data.hours.length - 1 &&
                        data.isEndHalfMinute
                    )}
              </CellGroup>
            ))}
          </Row>
        </React.Fragment>
      ))}
    </TableContainer>
  );
}

export default BaseTimeTable;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  overflow-x: auto;
  margin-bottom: 20px;
  padding: 0 15px 0 0;
  flex: 1;
  overflow-x: auto;
`;

const Header = styled.div`
  display: flex;
  padding-left: 30px;
`;

const HourContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  align-items: center;
  justify-content: center;
  gap: 15px;

  padding-bottom: 16px;
  padding-left: 15px;
  padding-right: 15px;
`;

const HourCell = styled.div`
  width: 40px;
  display: flex;
  justify-content: flex-end;
  padding-right: 4px;
  font-size: 12px;
  padding-left: 15px;
`;

const DateCell = styled.div`
  flex: 1;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const MonthCell = styled.div`
  flex: 1;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const Row = styled.div`
  display: flex;
`;

const CellGroup = styled.div<{ $isHalf: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
