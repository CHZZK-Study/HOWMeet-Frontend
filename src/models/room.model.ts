export interface PostRoomReq {
  req: {
    leaderMemberId: number;
    msRequest?: {
      dates: string[];
      name: { value: string };
      time: { startTime: string; endTime: string };
    };
    name: string;
  };
}
