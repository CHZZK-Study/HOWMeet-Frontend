import { getMeetingInfo } from '@/apis/meeting';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export const useMeetingInfo = () => {
  const [searchParams] = useSearchParams();
  const meetingId = searchParams.get('meetingId')!;
  const roomId = searchParams.get('roomId') || undefined;
  const loginType = searchParams.get('loginType');
  const isGuest = loginType === 'non-member';

  const { data } = useQuery({
    queryKey: ['meetingInfo', { roomId, meetingId }],
    queryFn: () => getMeetingInfo({ isGuest, roomId, meetingId }),
  });

  return { meetingInfo: data, meetingId, isGuest };
};
