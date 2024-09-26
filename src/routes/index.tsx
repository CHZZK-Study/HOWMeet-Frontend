import MainPage from '@/pages/MainPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import NewMeetingPage from '@/pages/NewMeetingPage';
import MeetingListPage from '@/pages/MeetingListPage';
import MeetingPage from '@/pages/MeetingPage';
import SelectPage from '@/pages/SelectPage';
import MakingRoomPage from '@/pages/MakingRoomPage';
import ConfirmMeeting from '@/pages/ConfirmMeeting';
import HomePage from '@/pages/HomePage';
import RoomPage from '@/pages/RoomPage';
import DecisionPage from '@/pages/DecisionPage';
import ResultPage from '@/pages/ResultPage';
import NewMeetingNonMemberPage from '@/pages/NewMeetingNonMemberPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'home',
    element: <HomePage />,
  },
  {
    path: 'make-room',
    element: <MakingRoomPage />,
  },
  {
    path: 'new-meeting',
    element: <NewMeetingPage />,
  },
  {
    path: 'new-meeting/non-member',
    element: <NewMeetingNonMemberPage />,
  },
  {
    path: 'confirm-meeting',
    element: <ConfirmMeeting />,
  },
  {
    path: 'meetings',
    element: <MeetingListPage />,
  },
  {
    path: 'meeting/:id',
    element: <MeetingPage />,
  },
  {
    path: 'meeting/:roomId/select/:meetingId',
    element: <SelectPage />,
  },
  {
    path: 'meeting/:roomId/decision/:meetingId',
    element: <DecisionPage />,
  },
  {
    path: 'meeting/:roomId/result/:meetingId',
    element: <ResultPage />,
  },
  {
    path: 'room/:id',
    element: <RoomPage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
