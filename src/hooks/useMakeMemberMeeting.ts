import { postMemberMeeting } from '@/apis/meeting';
import { PATH } from '@/constants/path';
import { MeetingReq } from '@/models/meeting.model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface MutationData {
  roomId: number;
  meetingReq: MeetingReq;
}

const useMakeMemberMeeting = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: handleMakeMemberMeeting } = useMutation({
    mutationFn: ({ roomId, meetingReq }: MutationData) =>
      postMemberMeeting({ roomId, meetingReq }),
    onSuccess: (res) => {
      const { roomId } = res.data;
      queryClient.invalidateQueries({ queryKey: ['room', roomId] });
      setTimeout(() => {
        navigate(`${PATH.room}/${roomId}`);
      }, 3000);
    },
  });

  return { handleMakeMemberMeeting };
};

export default useMakeMemberMeeting;
