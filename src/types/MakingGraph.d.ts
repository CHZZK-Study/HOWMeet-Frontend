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
  userCount: number;
}
