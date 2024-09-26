export interface NonMemberMeetingReq {
  dates: string[];
  time: {
    startTime: string;
    endTime: string;
  };
  name: {
    value: string;
  };
}
