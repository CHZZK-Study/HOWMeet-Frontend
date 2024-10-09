import { PATH } from '@/constants/path';
import useUserStore from '@/store/userStore';
import { useEffect } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

export const useRedirect = () => {
  const navigate = useNavigate();
  const isNotLoggedIn = useUserStore((state) => state.user) === null;
  const { pathname } = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isNotLoggedIn) {
      const isGuest = searchParams.get('isGuest') === 'true';

      navigate(
        `${PATH.login}?${params.roomId && `roomId=${params.roomId}&`}${params.meetingId && `meetingId=${params.meetingId}&`}loginType=${isGuest ? 'non-member' : 'member'}&callbackUrl=${pathname}`,
        { replace: true }
      );
    }
  }, []);
};
