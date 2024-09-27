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
