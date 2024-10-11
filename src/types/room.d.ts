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
  confirmedDates: string[];
  confirmedTime: {
    startTime: string;
    endTime: string;
    containsMidnight: boolean;
  };
};
