export interface RoomListRes {
  roomList: {
    roomId: string;
    name: string;
    memberSummary: string;
    schedules: {
      id: string;
      dates: string[];
      time: {
        startTime: string;
        endTime: string;
      };
      name: {
        value: string;
      };
      status: string;
    };
  }[];
  currentPage: string;
  hasNextPage: string;
  totalPages: string;
}
