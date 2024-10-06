import { TimeTableServerInfoProps } from '@/types/timeTableTypes';

export const TimeTableServerInfo = <TimeTableServerInfoProps>{
  id: 1,
  dates: ['2024-07-01', '2024-07-07'],
  time: {
    startTime: '09:30:00',
    endTime: '17:30:00',
    containsMidnight: false,
  },
  name: {
    value: 'Meeting A',
  },
  status: 'AVAILABLE',
};
