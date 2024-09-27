import { postMemberMeeting } from '@/apis/meeting';
import { MeetingReq } from '@/models/meeting.model';
import { useMutation } from '@tanstack/react-query';

interface MutationData {
  roomId: number;
  meetingReq: MeetingReq;
}

const useMakeMemberMeeting = () => {
  const { mutate: handleMakeMemberMeeting } = useMutation({
    mutationFn: ({ roomId, meetingReq }: MutationData) =>
      postMemberMeeting({ roomId, meetingReq }),
  });

  return { handleMakeMemberMeeting };
};

export default useMakeMemberMeeting;
