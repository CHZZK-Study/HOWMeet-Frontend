import { ResultHeatmapProps } from '@/types/ResultHeatmap';
import getAdjustedColor from '@/utils/getAdjustedColor';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

interface CellProps {
  intensity: number;
}

interface TimeTableProps {
  data: {
    hours: string[];
    days: string[];
    dates: string[];
    months: string[];
  };
  roomInfo: ResultHeatmapProps[];
}

function ResultHeatmap({ data, roomInfo }: TimeTableProps) {
  const [hoveredTimeSlot, setHoveredTimeSlot] = useState<
    ResultHeatmapProps['selectTime'][0] | null
  >(null);

  const groupedTimeSlots = useMemo(() => {
    const { selectTime } = roomInfo[0];
    const grouped: { [key: string]: ResultHeatmapProps['selectTime'][0] } = {};
    selectTime.forEach((selectCell) => {
      const date = selectCell.time.split('T')[0];
      const time = selectCell.time.split('T')[1];
      const hour = time.split(':')[0];
      const minute = time.split(':')[1];

      const key = `${date}-${hour}-${minute}`;

      if (grouped[key]) {
        grouped[key].users.push(...selectCell.users);
        grouped[key].userCount += selectCell.userCount;
      } else {
        grouped[key] = {
          time: selectCell.time,
          users: selectCell.users,
          userCount: selectCell.userCount,
        };
      }
    });
    return grouped;
  }, [roomInfo]);

  // 셀 여러개 렌더링
  const renderCells = useMemo(() => {
    return data.hours.map((hour) => (
      <Row key={hour}>
        <HourCell>{hour}</HourCell>
        {data.dates.map((date) => (
          <CellGroup key={`${hour}-${date}`}>
            {['00', '30'].map((minute) => {
              const key = `${date}-${hour}-${minute}`;
              const slot = groupedTimeSlots[key];

              const intensity = slot
                ? slot.userCount / roomInfo[0].totalParticipants.count
                : 0;
              return (
                <HalfCell
                  key={`${hour}-${date}-${minute}`}
                  intensity={intensity}
                  onMouseEnter={() => slot && setHoveredTimeSlot(slot)}
                  onMouseLeave={() => setHoveredTimeSlot(null)}
                />
              );
            })}
          </CellGroup>
        ))}
      </Row>
    ));
  }, [data, groupedTimeSlots, roomInfo]);

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
      {hoveredTimeSlot && (
        <Tooltip>
          <h4>{new Date(hoveredTimeSlot.time).toLocaleString()}</h4>
          <ul>
            {hoveredTimeSlot.users.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </Tooltip>
      )}
    </TableContainer>
  );
}

export default ResultHeatmap;

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
  background-color: ${(prop) => getAdjustedColor({ ratio: prop.intensity })};

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

const Tooltip = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
