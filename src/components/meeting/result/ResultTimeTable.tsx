// import ToolTip from '@/components/common/ToolTip';
// import { useTimeResultSelectionLogic } from '@/hooks/useResultSelectionLogic';
// import { TimeTableData, ResultHeatmapProps } from '@/types/timeTableTypes';
// import BaseTimeTable from '../common/timetable/BaseTimeTable';
// import TimeCell from '../common/timetable/TimeCell';

// interface ResultTimeTableProps {
//   data: TimeTableData;
//   roomInfo: ResultHeatmapProps;
//   dragDisabled?: boolean;
// }

// function ResultTimeTable({
//   data,
//   roomInfo,
//   dragDisabled = true,
// }: ResultTimeTableProps) {
//   const {
//     handleDragStart,
//     handleDragMove,
//     handleDragEnd,
//     isSelected,
//     handleCellHover,
//     tooltipInfo,
//     heatmapRef,
//   } = useTimeResultSelectionLogic();

//   const renderCell = (hour: string, date: string, minute: string) => {
//     const key = `${date}-${hour}-${minute}`;
//     const slot = roomInfo.selectTime.find(
//       (s) => s.time === `${date}T${hour}:${minute}`
//     );
//     const intensity = slot
//       ? slot.userCount / roomInfo.totalParticipants.count
//       : 0;

//     const timeSlot = {
//       hour,
//       minute,
//       day: data.days[data.dates.indexOf(date)],
//       date,
//       month: data.months[data.dates.indexOf(date)],
//     };

//     return (
//       <TimeCell
//         key={`${hour}-${date}-${minute}`}
//         timeSlot={timeSlot}
//         isSelected={isSelected(hour, minute, timeSlot.day)}
//         intensity={intensity}
//         onHover={(e) => handleCellHover(e, slot || null)}
//         onDragStart={dragDisabled ? undefined : handleDragStart}
//         onDragMove={dragDisabled ? undefined : handleDragMove}
//         onDragEnd={dragDisabled ? undefined : handleDragEnd}
//         mode="result"
//       />
//     );
//   };

//   return (
//     <div ref={heatmapRef} style={{ position: 'relative' }}>
//       <BaseTimeTable data={data} renderCell={renderCell} />
//       {tooltipInfo && (
//         <ToolTip
//           content={tooltipInfo.content}
//           x={tooltipInfo.x}
//           y={tooltipInfo.y}
//         />
//       )}
//     </div>
//   );
// }

// export default ResultTimeTable;
import ToolTip from '@/components/common/ToolTip';
import { useTimeSelectionLogic } from '@/hooks/useTimeSelectionLogic';
import { TimeTableData, ResultHeatmapProps } from '@/types/timeTableTypes';
import BaseTimeTable from '../common/timetable/BaseTimeTable';
import TimeCell from '../common/timetable/TimeCell';

interface ResultTimeTableProps {
  data: TimeTableData;
  roomInfo: ResultHeatmapProps;
  dragDisabled?: boolean;
}

function ResultTimeTable({
  data,
  roomInfo,
  dragDisabled = true,
}: ResultTimeTableProps) {
  const {
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    isSelected,
    handleCellHover,
    tooltipInfo,
    heatmapRef,
  } = useTimeSelectionLogic('result');

  const renderCell = (hour: string, date: string, minute: string) => {
    // const key = `${date}-${hour}-${minute}`;
    const slot = roomInfo.selectTime.find(
      (s) => s.time === `${date}T${hour}:${minute}`
    );
    const intensity = slot
      ? slot.userCount / roomInfo.totalParticipants.count
      : 0;

    const timeSlot = {
      hour,
      minute,
      day: data.days[data.dates.indexOf(date)],
      date,
      month: data.months[data.dates.indexOf(date)],
    };

    return (
      <TimeCell
        key={`${hour}-${date}-${minute}`}
        timeSlot={timeSlot}
        isSelected={isSelected(hour, minute, timeSlot.day)}
        intensity={intensity}
        onHover={(e) => handleCellHover(e, slot || null)}
        onDragStart={dragDisabled ? undefined : handleDragStart}
        onDragMove={dragDisabled ? undefined : handleDragMove}
        onDragEnd={dragDisabled ? undefined : handleDragEnd}
        mode="result"
      />
    );
  };

  return (
    <div ref={heatmapRef} style={{ position: 'relative' }}>
      <BaseTimeTable data={data} renderCell={renderCell} />
      {tooltipInfo && (
        <ToolTip
          content={tooltipInfo.content}
          x={tooltipInfo.x}
          y={tooltipInfo.y}
        />
      )}
    </div>
  );
}

export default ResultTimeTable;
