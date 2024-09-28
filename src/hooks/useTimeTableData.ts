import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/apis/instance';
import { useParams } from 'react-router-dom';
import useUserStore from '@/store/userStore';
import {
  DecisionHeatmapProps,
  TimeTableServerInfoProps,
} from '@/types/timeTableTypes';

const useTimeTableData = (isSelectPage?: boolean) => {
  const { roomId, meetingId } = useParams();
  const user = useUserStore((state) => state.user);

  const isGuest = !user?.isMember;

  const {
    isLoading: isTimeTableLoading,
    data: timeTableServerData,
    isError,
  } = useQuery<TimeTableServerInfoProps>({
    queryKey: ['TimeTableServerInfo'],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/${isGuest ? `guest-schedule/${meetingId}` : `room/${roomId}/${meetingId}`}`
      );
      return response.data; // 데이터 반환
    },
  });

  const { isLoading: isMemberLoading, data: isLeader } = useQuery<boolean>({
    queryKey: ['isLeader'],
    queryFn: async () => {
      if (isGuest) return null; // isGuest가 true면 null 반환
      const response = await axiosInstance.get(`/room/${roomId}/members`);
      return response.data; // 데이터 반환
    },
    enabled: !isGuest,
  });

  const {
    isLoading: isSelectTimeDataLoading,
    error: isSelectedTimeDataError,
    data: selectedTimeData,
  } = useQuery<DecisionHeatmapProps>({
    queryKey: ['selectedTimeData'],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/${isGuest ? 'gs-record' : `ms-record/${roomId}`}/${meetingId}`
      );
      return response.data; // 데이터 반환
    },
    enabled: !isSelectPage,
  });

  return {
    isTimeTableLoading,
    isSelectTimeDataLoading,
    selectedTimeData,
    isSelectedTimeDataError,
    timeTableServerData,
    roomId,
    meetingId,
    isGuest,
    user,
    isError,
    isLeader,
    isMemberLoading,
  };
};

export default useTimeTableData;
