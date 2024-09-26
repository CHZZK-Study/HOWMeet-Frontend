import { AxiosResponse } from 'axios';
import { RoomDetailRes, RoomListRes } from '@/models/room.model';
import { axiosInstance } from './instance';

export const getRoomList = async (memberId: number) => {
  const result: AxiosResponse<RoomListRes> = await axiosInstance.get(
    `/room/joined/${memberId}`
  );

  return result.data;
};

export const getRoomDetail = async (roomId: number) => {
  const result: AxiosResponse<RoomDetailRes> = await axiosInstance.get(
    `/room/${roomId}`
  );

  return result.data;
};
