export interface TimeTableServerInfoProps {
  gsId: number;
  dates: string[];
  time: {
    startTime: string;
    endTime: string;
  };
  name: {
    value: string;
  };
}

export const TimeTableServerInfo = <TimeTableServerInfoProps>{
  gsId: 1,
  dates: ['2023-01-01', '2023-01-07'],
  time: {
    startTime: '09:00:00',
    endTime: '17:00:00',
  },
  name: {
    value: 'Meeting A',
  },
  status: 'AVAILABLE',
};
