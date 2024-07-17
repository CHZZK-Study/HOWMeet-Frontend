import React from 'react';
import MainPage from '@/pages/MainPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import NewMeetingPage from '@/pages/NewMeetingPage';
import MeetingListPage from '@/pages/MeetingListPage';
import MeetingPage from '@/pages/MeetingPage';
import SelectPage from '@/pages/SelectPage';
import ResultPage from '@/pages/ResultPage';

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
    path: 'new-meeting',
    element: <NewMeetingPage />,
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
    path: 'meeting/:id/select',
    element: <SelectPage />,
  },
  {
    path: 'meeting/:id/result',
    element: <ResultPage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
