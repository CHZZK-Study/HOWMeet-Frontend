export interface ResultHeatmapProps {
  RoomId: number;
  TotalPersonnel: string[];
  selectTime: {
    time: string;
    users: string[];
    userCount: number;
  }[];
  participatedPersonnel: string[];
}

export interface ResultHeatmapCellInfo {
  users: string[];
  userCount: number;
  hour: string;
  minute: string;
  day: string;
  date: string;
  month: string;
}

export interface AdjustColorProps {
  ratio: number;
}

export interface TimeSlot {
  hour: string;
  minute: string;
  day: string;
  date: string;
  month: string;
}

export interface TimeTableData {
  hours: string[];
  days: string[];
  dates: string[];
  months: string[];
  isStartHalfMinute: boolean;
  isEndHalfMinute: boolean;
}

export interface TimeTableProps {
  data: TimeTableData;
  dragDisabled?: boolean;
}

export interface CellProps {
  selected: boolean;
  isStartCellHalf: boolean;
  isEndCellHalf: boolean;
}

export interface RenderCellProps {
  hour: string;
  date: string;
  minute: string;
  isStartCellHalf: boolean;
  isEndCellHalf: boolean;
}

interface BaseTimeCellProps {
  isSelected: boolean;
  dragDisabled: boolean;
  isStartCellHalf: boolean;
  isEndCellHalf: boolean;
  onDragEnd: () => void;
}

export interface SelectTimeCellProps extends BaseTimeCellProps {
  timeSlot: TimeSlot;
  onDragStart: (timeSlot: TimeSlot) => void;
  onDragMove: (timeSlot: TimeSlot) => void;
}

export interface ResultTimeCellProps extends BaseTimeCellProps {
  timeSlot: ResultHeatmapCellInfo;
  intensity: number;
  onDragStart: (
    timeSlot: ResultHeatmapCellInfo,
    event: React.MouseEvent | React.TouchEvent
  ) => void;
  onDragMove: (
    timeSlot: ResultHeatmapCellInfo,
    event: React.MouseEvent | React.TouchEvent
  ) => void;
  onCellInteraction: (
    event: React.MouseEvent | React.TouchEvent,
    slot: ResultHeatmapCellInfo | null
  ) => void;
}
