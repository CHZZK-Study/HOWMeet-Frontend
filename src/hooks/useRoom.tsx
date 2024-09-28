import { getRoomDetail } from '@/apis/room.api';
import { useQuery } from '@tanstack/react-query';

const useRoom = (roomId: number) => {
  const { data: roomDetail, isError } = useQuery({
    queryKey: ['room', roomId],
    queryFn: () => getRoomDetail(roomId),
  });

  return { roomDetail, isError };
};

export default useRoom;
