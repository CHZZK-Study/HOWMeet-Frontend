import { Schedule } from '@/types/room';

export interface PostRoomReq {
  name: string;
  leaderMemberId: number;
}

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
        containsMidnight: boolean;
      };
      name: {
        value: string;
      };
      status: string;
    }[];
    hasNonParticipant: boolean;
  }[];
  currentPage: string;
  hasNextPage: string;
  totalPages: string;
}

export interface RoomDetailRes {
  roomId: string;
  name: string;
  roomMembers: {
    id: string;
    memberId: string;
    nickname: string;
    isLeader: boolean;
  }[];
  schedules: Schedule[];
}
