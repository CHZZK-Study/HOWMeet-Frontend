import { AxiosResponse } from 'axios';
import { RoomListRes } from '@/models/room.model';
import { axiosInstance } from './instance';

export const getRoomList = async (memberId: number) => {
  const result: AxiosResponse<RoomListRes> = await axiosInstance.get(
    `/room/joined/${memberId}`
  );

  return result.data;
};
