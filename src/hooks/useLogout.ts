import { logOut } from '@/apis/user.api';
import { PATH } from '@/constants/path';
import { useLogOutModal } from '@/store/useModalStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useLogout = () => {
  const navigate = useNavigate();
  const closeLogOut = useLogOutModal((state) => state.close);

  const { mutate: handleLogout } = useMutation({
    mutationFn: () => logOut(),
    onError: () => toast.error('로그아웃에 실패했습니다.'),
    onSuccess: () => {
      closeLogOut();
      navigate(PATH.main);
    },
  });

  return { handleLogout };
};
