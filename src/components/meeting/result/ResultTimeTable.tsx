import { useTimeSelectionLogic } from '@/hooks/useTimeSelectionLogic';
import {
  TimeTableData,
  ResultHeatmapProps,
  ResultHeatmapCellInfo,
  DecisionHeatmapProps,
} from '@/types/timeTableTypes';
import ToolTip from '@/components/common/ToolTip';
import BaseTimeTable, { TableContainer } from '../timetable/BaseTimeTable';
import ResultTimeCell from '../timetable/ResultTimeCell';

interface ResultTimeTableProps {
  timetableInfo: TimeTableData;
  roomInfo: ResultHeatmapProps | DecisionHeatmapProps;
  dragDisabled: boolean;
}

function ResultTimeTable({
  timetableInfo,
  roomInfo,
  dragDisabled,
}: ResultTimeTableProps) {
  const {
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    isSelected,
    handleCellInteraction,
    tooltipInfo,
    heatmapRef,
  } = useTimeSelectionLogic({ isSelectOption: false });

  const renderCell = (
    hour: string,
    date: string,
    minute: string,
    isStartCellHalf: boolean,
    isEndCellHalf: boolean
  ) => {
    const slot = roomInfo.time.find(
      (s) => s.selectTime === `${date}T${hour}:${minute}:00`
    );
    const intensity = slot
      ? slot.participantDetails.nicknames.length /
        roomInfo.totalPersonnel.length
      : 0;

    const isDisabled =
      (timetableInfo.isContainMidnight &&
        date === timetableInfo.dates[0] &&
        hour < timetableInfo.startHour) ||
      (timetableInfo.isContainMidnight &&
        date === timetableInfo.dates[timetableInfo.dates.length - 1] &&
        hour >= timetableInfo.endHour);

    const timeSlot: ResultHeatmapCellInfo = {
      hour,
      minute,
      day: timetableInfo.days[timetableInfo.dates.indexOf(date)],
      date,
      month: timetableInfo.months[timetableInfo.dates.indexOf(date)],
      users: slot ? slot.participantDetails.nicknames : [],
      userCount: slot ? slot.participantDetails.nicknames.length : 0,
    };

    return (
      <ResultTimeCell
        key={`${hour}-${date}-${minute}`}
        timeSlot={timeSlot}
        isSelected={isSelected(hour, minute, timeSlot.day)}
        intensity={intensity}
        dragDisabled={dragDisabled}
        onCellInteraction={handleCellInteraction}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        isEndCellHalf={isEndCellHalf}
        isStartCellHalf={isStartCellHalf}
        disabled={isDisabled || false}
      />
    );
  };

  return (
    <TableContainer ref={heatmapRef} style={{ position: 'relative' }}>
      <BaseTimeTable data={timetableInfo} renderCell={renderCell} />
      {tooltipInfo?.content && (
        <ToolTip
          content={tooltipInfo.content}
          x={tooltipInfo.x}
          y={tooltipInfo.y}
          isAbove={tooltipInfo.isAbove}
        />
      )}
    </TableContainer>
  );
}

export default ResultTimeTable;
