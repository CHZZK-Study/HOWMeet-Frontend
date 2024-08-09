interface TimeSlot {
  time: string;
  users: string[];
  userCount: number;
}

interface RankedTimeSlot {
  startTime: string;
  endTime: string;
  users: string[];
  rank: number;
}

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
    timeRanges.push({
      startTime: sortedTimeSlots[i].time,
      endTime: sortedTimeSlots[j].time,
      users: sortedTimeSlots[i].users,
      userCount: sortedTimeSlots[i].userCount,
    });
  }

  const rankedTimeRanges = timeRanges.sort((a, b) => {
    // 우선 사용자 수로 정렬
    if (b.userCount !== a.userCount) {
      return b.userCount - a.userCount;
    }
    // 사용자 수가 같다면 시간 길이로 정렬
    const aDuration =
      new Date(a.endTime).getTime() - new Date(a.startTime).getTime();
    const bDuration =
      new Date(b.endTime).getTime() - new Date(b.startTime).getTime();
    return bDuration - aDuration;
  });

  // 겹치는 시간 제거
  const finalRankedTimeRanges: RankedTimeSlot[] = [];
  rankedTimeRanges.forEach((range, index) => {
    if (!isOverlapping(range, finalRankedTimeRanges)) {
      finalRankedTimeRanges.push({
        ...range,
        rank: finalRankedTimeRanges.length + 1,
      });
    }
    if (finalRankedTimeRanges.length === 4) return;
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
