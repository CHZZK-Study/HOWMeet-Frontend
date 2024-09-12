import { getRoomList } from '@/apis/room.api';
import { useQuery } from '@tanstack/react-query';

const useRoomList = (memberId: number) => {
  const { data: roomList, isError } = useQuery({
    queryKey: ['roomList'],
    queryFn: () => getRoomList(memberId),
  });

  return { roomList, isError };
};

export default useRoomList;
