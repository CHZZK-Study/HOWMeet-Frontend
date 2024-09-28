export type Schedule = {
  id: string;
  dates: string[];
  time: {
    startTime: string;
    endTime: string;
  };
  name: {
    value: string;
  };
  status: string;
  isParticipant?: boolean;
};
