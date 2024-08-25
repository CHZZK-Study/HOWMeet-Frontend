export interface ResultHeatmapProps {
  RoomId: number;
  totalParticipants: {
    count: number;
    names: string[];
  };
  selectTime: {
    time: string;
    users: string[];
    userCount: number;
  }[];
  participatedUsers: {
    count: number;
    names: string[];
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
}

export interface TimeTableProps {
  data: TimeTableData;
  dragDisabled?: boolean;
}

export interface CellProps {
  selected: boolean;
}
