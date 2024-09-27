import { NonMemberMeetingReq } from '@/models/meeting.model';
import { axiosInstance } from './instance';

const postNonMemberMeeting = async (req: NonMemberMeetingReq) => {
  const result = await axiosInstance.post('/guest-schedule', req);

  return result;
};

export default postNonMemberMeeting;
