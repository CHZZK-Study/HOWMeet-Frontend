import { TimeSlot, TimeTableData } from '@/types/timeTableTypes';
import { useTimeSelectionLogic } from '@/hooks/useTimeSelectionLogic';
import BaseTimeTable from '../timetable/BaseTimeTable';
import SelectTimeCell from '../timetable/SelectTimeCell';

interface SelectableTimeTableProps {
  data: TimeTableData;
  dragDisabled?: boolean;
}

function SelectableTimeTable({
  data,
  dragDisabled = false,
}: SelectableTimeTableProps) {
  const { handleDragStart, handleDragMove, handleDragEnd, isSelected } =
    useTimeSelectionLogic({ isSelectOption: true });

  const renderCell = (hour: string, date: string, minute: string) => {
    const timeSlot = {
      hour,
      minute,
      day: data.days[data.dates.indexOf(date)],
      date,
      month: data.months[data.dates.indexOf(date)],
    };

    return (
      <SelectTimeCell
        key={`${hour}-${date}-${minute}`}
        timeSlot={timeSlot}
        isSelected={isSelected(hour, minute, timeSlot.day)}
        dragDisabled={dragDisabled}
        onDragStart={handleDragStart as (timeSlot: TimeSlot) => void}
        onDragMove={handleDragMove as (timeSlot: TimeSlot) => void}
        onDragEnd={handleDragEnd}
      />
    );
  };

  return <BaseTimeTable data={data} renderCell={renderCell} />;
}

export default SelectableTimeTable;
