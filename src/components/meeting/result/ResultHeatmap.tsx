import { useMemo } from 'react';
import styled from 'styled-components';
import TimeTableLayout from '@/layouts/TimeTableLayout';
import {
  ResultHeatmapCellInfo,
  ResultHeatmapProps,
} from '@/types/ResultHeatmap';
import getAdjustedColor from '@/utils/meeting/timetable/getAdjustedColor';
import ToolTip from '@/components/common/ToolTip';
import { useTimeResultSelectionLogic } from '@/hooks/useResultSelectionLogic';

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
  roomInfo: ResultHeatmapProps;
  dragDisabled?: boolean;
}

function ResultHeatmap({ data, roomInfo, dragDisabled }: TimeTableProps) {
  const {
    handleCellHover,
    handleDragEnd,
    handleDragMove,
    handleDragStart,
    heatmapRef,
    isSelected,
    setTooltipInfo,
    tooltipInfo,
  } = useTimeResultSelectionLogic();

  const groupedTimeSlots = useMemo(() => {
    const { selectTime } = roomInfo;
    const grouped: { [key: string]: ResultHeatmapCellInfo } = {};
    selectTime.forEach((selectCell) => {
      const date = selectCell.time.split('T')[0];
      const time = selectCell.time.split('T')[1];
      const hour = time.split(':')[0];
      const minute = time.split(':')[1];

      const key = `${date}-${hour}-${minute}`;

      if (grouped[key]) {
        grouped[key].users.push(...selectCell.users);
        grouped[key].userCount += selectCell.users.length;
      } else {
        grouped[key] = {
          time: selectCell.time,
          users: selectCell.users,
          userCount: selectCell.users.length,
          date,
          hour,
          minute,
        };
      }
    });
    return grouped;
  }, [roomInfo]);

  const handleCellClick = (slot: ResultHeatmapCellInfo) => {
    console.log(slot);
  };

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
                ? slot.userCount / roomInfo.totalParticipants.count
                : 0;
              return (
                <HalfCell
                  key={`${hour}-${date}-${minute}`}
                  intensity={intensity}
                  onMouseEnter={(e) => handleCellHover(e, slot)}
                  onMouseLeave={() => setTooltipInfo(null)}
                  onClick={() => handleCellClick(slot)}
                />
              );
            })}
          </CellGroup>
        ))}
      </Row>
    ));
  }, [
    data.dates,
    data.hours,
    groupedTimeSlots,
    handleCellHover,
    roomInfo.totalParticipants.count,
    setTooltipInfo,
  ]);

  return (
    <HeatmapContainer ref={heatmapRef}>
      <TimeTableLayout data={data} renderCells={renderCells} />
      {tooltipInfo && (
        <ToolTip
          content={tooltipInfo.content}
          x={tooltipInfo.x}
          y={tooltipInfo.y}
        />
      )}
    </HeatmapContainer>
  );
}

export default ResultHeatmap;

const HeatmapContainer = styled.div`
  position: relative;
`;

const Row = styled.div`
  display: flex;
`;

const HourCell = styled.div`
  width: 40px;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
`;

const CellGroup = styled.div`
  flex: 1;
  height: 40px;
  border: 0.8px solid #ccc;
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
