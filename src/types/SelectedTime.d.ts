// export interface TimeSlot {
//   time: string;
//   users: string[];
//   userCount: number;
// }

// export interface RankedTimeSlot {
//   startTime: string;
//   endTime: string;
//   users: string[];
//   rank: number;
//   userCount: number;
// }

export interface TimeTableProps {
  data: {
    hours: string[];
    days: string[];
    dates: string[];
    months: string[];
  };
  dragDisabled?: boolean;
}

export interface CellProps {
  selected: boolean;
}
