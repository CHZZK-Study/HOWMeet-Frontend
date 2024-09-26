export interface ResultHeatmapProps {
  roomName: string;
  msName: string;
  totalPersonnel: string[];
  participantPerson: string[];
  confirmTime: string[];
  time: {
    selectTime: string;
    participantDetails: {
      count: number;
      nicknames: string[];
    };
  }[];
}
export interface DecisionHeatmapProps {
  msId: number;
  roomName: string;
  totalPersonnel: string[];
  time: {
    selectTime: string;
    participantDetails: {
      count: number;
      nicknames: string[];
    };
  }[];
  participatedPersonnel: string[];
}
export interface TimeTableServerInfoProps {
  id: number;
  dates: string[];
  time: {
    startTime: string;
    endTime: string;
    containsMidnight: boolean;
  };
  name: {
    value: string;
  };
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
  startHour: string;
  endHour: string;
  isContainMidnight?: boolean;
}

export interface TimeTableProps {
  data: TimeTableData;
  dragDisabled?: boolean;
}

export interface CellProps {
  selected: boolean;
  $isStartCellHalf: boolean;
  $isEndCellHalf: boolean;
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
  disabled: boolean;
}

export interface ResultTimeCellProps extends BaseTimeCellProps {
  timeSlot: ResultHeatmapCellInfo;
  intensity: number;
  disabled: boolean;

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
