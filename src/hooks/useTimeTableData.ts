import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/apis/instance';
import { useParams } from 'react-router-dom';
import useUserStore from '@/store/userStore';
import { TimeTableServerInfoProps } from '@/types/timeTableTypes';

const useTimeTableData = () => {
  const { roomId, meetingId } = useParams();
  const { user } = useUserStore();
  const isGuest = !user?.isMember;
  const token = isGuest
    ? sessionStorage.getItem('@HOWMEET_ACCESS_TOKEN')
    : localStorage.getItem('@HOWMEET_ACCESS_TOKEN');

  const {
    isLoading: isTimeTableLoading,
    data: timeTableServerData,
    isError,
  } = useQuery<TimeTableServerInfoProps>({
    queryKey: ['TimeTableServerInfo'],
    queryFn: async () => {
      const headers = isGuest ? {} : { Authorization: `Bearer ${token}` };
      const response = await axiosInstance.get(
        `/${isGuest ? `guest-schedule/${meetingId}` : `room/${roomId}/${meetingId}`}`,
        { headers }
      );
      return response.data; // 데이터 반환
    },
  });

  return {
    isTimeTableLoading,
    timeTableServerData,
    roomId,
    meetingId,
    isGuest,
    token,
    user,
    isError,
  };
};

export default useTimeTableData;
