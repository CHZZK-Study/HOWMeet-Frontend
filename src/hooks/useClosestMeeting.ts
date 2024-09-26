type Room = {
  roomId: string;
  name: string;
  memberSummary: string;
  schedules: {
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
  }[];
};

type ScheduleWithDateDiff = {
  roomId: string;
  roomName: string;
  scheduleId: string;
  scheduleName: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  status: string;
  dateDiff: number;
};

const useClosestMeeting = () => {
  function dateDiffInDays(date1: Date, date2: Date): number {
    const diffTime: number = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  function findClosestSchedules(
    data: Room[],
    today: Date,
    numSchedules: number = 3
  ): ScheduleWithDateDiff[] {
    const scheduleList: ScheduleWithDateDiff[] = [];

    data.forEach((room) => {
      room.schedules.forEach((schedule) => {
        const startDate: Date = new Date(schedule.dates[0]);
        const endDate: Date = new Date(schedule.dates[1]);

        scheduleList.push({
          roomId: room.roomId,
          roomName: room.name,
          scheduleId: schedule.id,
          scheduleName: schedule.name.value,
          startDate,
          endDate,
          startTime: schedule.time.startTime,
          endTime: schedule.time.endTime,
          status: schedule.status,
          dateDiff: Math.min(
            dateDiffInDays(today, startDate),
            dateDiffInDays(today, endDate)
          ),
        });
      });
    });

    scheduleList.sort((a, b) => a.dateDiff - b.dateDiff);

    return scheduleList.slice(0, numSchedules);
  }

  return { findClosestSchedules };
};

export default useClosestMeeting;
