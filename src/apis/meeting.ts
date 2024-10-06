import { MeetingReq } from '@/models/meeting.model';
import { axiosInstance } from './instance';

interface MutationData {
  roomId: number;
  meetingReq: MeetingReq;
}

export const postMemberMeeting = async ({
  roomId,
  meetingReq,
}: MutationData) => {
  const result = await axiosInstance.post(`/room/${roomId}`, meetingReq);
  return result;
};

export interface GetMeetingInfoReq {
  isGuest: boolean;
  meetingId: string;
  roomId?: string;
}

export const getMeetingInfo = async ({
  isGuest,
  meetingId,
  roomId,
}: GetMeetingInfoReq) => {
  const response = await axiosInstance.get(
    `/${isGuest ? `guest-schedule/${meetingId}` : `room/${roomId}/${meetingId}`}`
  );
  return response.data;
};
