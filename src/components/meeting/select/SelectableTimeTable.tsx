import { TimeTableData, TimeSlot } from '@/types/timeTableTypes';
import BaseTimeTable from '../common/timetable/BaseTimeTable';
import TimeCell from '../common/timetable/TimeCell';
import { useTimeSelectionLogic } from '@/hooks/useTimeSelectionLogic';

interface SelectableTimeTableProps {
  data: TimeTableData;
  dragDisabled?: boolean;
}

function SelectableTimeTable({
  data,
  dragDisabled = false,
}: SelectableTimeTableProps) {
  const { handleDragStart, handleDragMove, handleDragEnd, isSelected } =
    useTimeSelectionLogic();

  const renderCell = (hour: string, date: string, minute: string) => {
    const timeSlot: TimeSlot = {
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
        onDragStart={dragDisabled ? undefined : handleDragStart}
        onDragMove={dragDisabled ? undefined : handleDragMove}
        onDragEnd={dragDisabled ? undefined : handleDragEnd}
        mode="select"
      />
    );
  };

  return <BaseTimeTable data={data} renderCell={renderCell} />;
}

export default SelectableTimeTable;
