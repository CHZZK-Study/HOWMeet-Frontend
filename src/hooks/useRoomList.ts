import { getRoomList } from '@/apis/room.api';
import { useQuery } from '@tanstack/react-query';

const useRoomList = (memberId: number) => {
  const { data: roomListRes, isError } = useQuery({
    queryKey: ['roomList'],
    queryFn: () => getRoomList(memberId),
  });

  return { roomListRes, isError };
};

export default useRoomList;
