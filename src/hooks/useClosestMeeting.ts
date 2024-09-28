import { Schedule } from '@/types/room';

type Room = {
  roomId: string;
  name: string;
  memberSummary: string;
  schedules: Schedule[];
};

type ScheduleWithDateDiff = {
  roomId: string;
  roomName: string;
  scheduleId: string;
  scheduleName: string;
  confirmDate: Date;
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
      room.schedules
        .filter((item) => item.status === 'COMPLETE')
        .forEach((schedule) => {
          const confirmDate: Date = new Date(schedule.dates[0]);
          scheduleList.push({
            roomId: room.roomId,
            roomName: room.name,
            scheduleId: schedule.id,
            scheduleName: schedule.name.value,
            confirmDate,
            startTime: schedule.time.startTime,
            endTime: schedule.time.endTime,
            status: schedule.status,
            dateDiff: dateDiffInDays(today, confirmDate),
          });
        });
    });

    scheduleList.sort((a, b) => a.dateDiff - b.dateDiff);

    return scheduleList.slice(0, numSchedules);
  }

  return { findClosestSchedules };
};

export default useClosestMeeting;
