import { RankedTimeSlot, TimeSlot } from '@/types/MakingGraph';
import { addMinutes, parseISO, format } from 'date-fns';

export const calculateTimeRanking = (data: TimeSlot[]): RankedTimeSlot[] => {
  const sortedTimeSlots = data.sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  const timeRanges: {
    startTime: string;
    endTime: string;
    users: string[];
    userCount: number;
  }[] = [];

  for (let i = 0; i < sortedTimeSlots.length; i += 1) {
    let j = i;
    while (
      j < sortedTimeSlots.length - 1 &&
      isConsecutiveTime(sortedTimeSlots[j].time, sortedTimeSlots[j + 1].time)
    ) {
      j += 1;
    }

    const startTime = sortedTimeSlots[i].time;
    let endTime: string;

    if (sortedTimeSlots[i].time === sortedTimeSlots[j].time) {
      const endTimeDate = addMinutes(parseISO(startTime), 30);
      endTime = format(endTimeDate, "yyyy-MM-dd'T'HH:mm");
    } else {
      endTime = sortedTimeSlots[j].time;
    }

    timeRanges.push({
      startTime,
      endTime,
      users: sortedTimeSlots[i].users,
      userCount: sortedTimeSlots[i].userCount,
    });
  }

  const rankedTimeRanges = timeRanges.sort((a, b) => {
    if (b.userCount !== a.userCount) {
      return b.userCount - a.userCount;
    }
    const aDuration =
      new Date(a.endTime).getTime() - new Date(a.startTime).getTime();
    const bDuration =
      new Date(b.endTime).getTime() - new Date(b.startTime).getTime();
    if (bDuration !== aDuration) {
      return bDuration - aDuration;
    }
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });

  const finalRankedTimeRanges: RankedTimeSlot[] = [];
  let currentRank = 1;
  let lastUserCount = -1;
  let lastDuration = -1;

  rankedTimeRanges.forEach((range) => {
    if (!isOverlapping(range, finalRankedTimeRanges)) {
      const duration =
        new Date(range.endTime).getTime() - new Date(range.startTime).getTime();

      if (range.userCount !== lastUserCount || duration !== lastDuration) {
        currentRank = finalRankedTimeRanges.length + 1;
      }

      finalRankedTimeRanges.push({
        ...range,
        rank: currentRank,
      });

      lastUserCount = range.userCount;
      lastDuration = duration;
    }
    if (finalRankedTimeRanges.length === 4) {
      return finalRankedTimeRanges;
    }
  });

  return finalRankedTimeRanges;
};

function isOverlapping(
  range: { startTime: string; endTime: string },
  rankedRanges: RankedTimeSlot[]
): boolean {
  return rankedRanges.some((rankedRange) => {
    const rangeStart = new Date(range.startTime).getTime();
    const rangeEnd = new Date(range.endTime).getTime();
    const rankedStart = new Date(rankedRange.startTime).getTime();
    const rankedEnd = new Date(rankedRange.endTime).getTime();
    return rangeStart < rankedEnd && rangeEnd > rankedStart;
  });
}

const isConsecutiveTime = (time1: string, time2: string) => {
  const time1Obj = new Date(time1);
  const time2Obj = new Date(time2);

  return time1Obj.getTime() + 30 * 60 * 1000 === time2Obj.getTime();
};
