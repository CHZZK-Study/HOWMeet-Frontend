export interface TimeSlot {
  time: string;
  users: string[];
  userCount: number;
}

export interface RankedTimeSlot {
  startTime: string;
  endTime: string;
  users: string[];
  rank: number;
}

export interface ChartData {
  rank: number;
  users: string[];
  userCount: number;
  startTime: string;
  endTime: string;
}
