import postNonMemberMeeting from '@/apis/meeting.api';
import { NonMemberMeetingReq } from '@/models/meeting.model';
import useStepStore from '@/store/meeting/useStepStore';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const useNonMemberMeeting = () => {
  const setStep = useStepStore((state) => state.setStep);

  const { mutate: handleMakeNonMemberMeeting } = useMutation({
    mutationFn: (meetingData: NonMemberMeetingReq) =>
      postNonMemberMeeting(meetingData),
    onSuccess: () => {
      setStep('login');
    },
    onError: () => toast.error('잠시후 다시 시도해 주세요.'),
  });

  return { handleMakeNonMemberMeeting };
};

export default useNonMemberMeeting;
