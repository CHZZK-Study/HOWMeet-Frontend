import { postRoom } from '@/apis/room.api';
import { PATH } from '@/constants/path';
import { PostRoomReq } from '@/models/room.model';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MeetingReq } from '@/models/meeting.model';
import useMakeMemberMeeting from './useMakeMemberMeeting';

const useMakeRoom = (isContainMeeting: boolean, meetingReq: MeetingReq) => {
  const navigate = useNavigate();
  const { handleMakeMemberMeeting } = useMakeMemberMeeting();

  const { mutate: handleMakeRoom } = useMutation({
    mutationFn: (roomReq: PostRoomReq) => postRoom(roomReq),
    onSuccess: (res) => {
      const { roomId } = res.data;

      if (isContainMeeting) {
        handleMakeMemberMeeting({ roomId, meetingReq });
      }

      navigate(`${PATH.room}/${roomId}`);
    },
  });

  return { handleMakeRoom };
};

export default useMakeRoom;
