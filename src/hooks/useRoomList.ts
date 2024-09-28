import { getRoomList } from '@/apis/room.api';
import { useInfiniteQuery } from '@tanstack/react-query';

const useRoomList = (memberId: number) => {
  const {
    data: roomListRes,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['roomList', memberId],
    queryFn: ({ pageParam = 1 }) => getRoomList(memberId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.currentPage + 1 : undefined;
    },
  });

  return {
    roomListRes,
    hasNextPage,
    fetchNextPage,
  };
};

export default useRoomList;
