import { PostRoomReq } from '@/models/room.model';
import { axiosInstance } from './instance';

export const postRoom = async (req: PostRoomReq) => {
  const result = await axiosInstance.post('/room', req);
  return result;
};
