import { postRoom } from '@/apis/room.api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useMakeRoom = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postRoom,
    onSuccess: () => {
      navigate('/room/1');
    },
    onError: () => {
      window.alert('잠시후 다시 시도해 주세요.');
    },
  });
};

export default useMakeRoom;
