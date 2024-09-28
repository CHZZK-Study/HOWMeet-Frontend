import { PostRoomReq, RoomDetailRes, RoomListRes } from '@/models/room.model';
import { AxiosResponse } from 'axios';
import { axiosInstance } from './instance';

export const postRoom = async (req: PostRoomReq) => {
  const result = await axiosInstance.post('/room', req);
  return result;
};

export const getRoomList = async (memberId: number, page: number) => {
  const result: AxiosResponse<RoomListRes> = await axiosInstance.get(
    `/room/joined/${memberId}?page=${page}`
  );

  return result.data;
};

export const getRoomDetail = async (roomId: number) => {
  const result: AxiosResponse<RoomDetailRes> = await axiosInstance.get(
    `/room/${roomId}`
  );

  return result.data;
};
