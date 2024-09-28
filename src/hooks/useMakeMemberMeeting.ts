import { postMemberMeeting } from '@/apis/meeting';
import { PATH } from '@/constants/path';
import { MeetingReq } from '@/models/meeting.model';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface MutationData {
  roomId: number;
  meetingReq: MeetingReq;
}

const useMakeMemberMeeting = () => {
  const navigate = useNavigate();

  const { mutate: handleMakeMemberMeeting } = useMutation({
    mutationFn: ({ roomId, meetingReq }: MutationData) =>
      postMemberMeeting({ roomId, meetingReq }),
    onSuccess: (res) => {
      const { roomId } = res.data;
      navigate(`${PATH.room}/${roomId}`);
    },
  });

  return { handleMakeMemberMeeting };
};

export default useMakeMemberMeeting;
