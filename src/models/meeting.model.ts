export interface MeetingReq {
  dates: string[];
  time: {
    startTime: string;
    endTime: string;
  };
  name: {
    value: string;
  };
}
