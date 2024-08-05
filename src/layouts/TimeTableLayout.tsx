// components/layout/TimeTableLayout.tsx

import React from 'react';
import styled from 'styled-components';

interface TimeTableLayoutProps {
  data: {
    hours: string[];
    days: string[];
    dates: string[];
    months: string[];
  };
  renderCells: React.ReactNode;
}

function TimeTableLayout({ data, renderCells }: TimeTableLayoutProps) {
  return (
    <TableContainer>
      <Header>
        <HourCell />
        {data.months.map((month) => (
          <MonthCell>{month}</MonthCell>
        ))}
      </Header>
      <Header>
        <HourCell />
        {data.days.map((day) => (
          <DateCell>{day}</DateCell>
        ))}
      </Header>
      {renderCells}
    </TableContainer>
  );
}

export default TimeTableLayout;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
  padding: 0 15px;
`;

const Header = styled.div`
  display: flex;
`;

const HourCell = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
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

const Row = styled.div`
  display: flex;
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
