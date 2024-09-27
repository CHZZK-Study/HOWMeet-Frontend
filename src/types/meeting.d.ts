export type MeetingData = {
  name: { value: string };
  dates: string[];
  times: { startTime: string; endTime: string };
};

export type Content = 'make' | 'confirm' | 'login' | 'share';
