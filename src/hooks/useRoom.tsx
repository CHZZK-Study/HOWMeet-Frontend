import { getRoomDetail } from '@/apis/room.api';
import { useQuery } from '@tanstack/react-query';

const useRoom = (roomId: number | undefined) => {
  const { data: roomDetail, isError } = useQuery({
    queryKey: ['room', roomId],
    queryFn: () => getRoomDetail(roomId!),
    enabled: !!roomId,
  });

  return { roomDetail, isError };
};

export default useRoom;
