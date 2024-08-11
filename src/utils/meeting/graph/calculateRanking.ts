import { ChartData } from '@/types/MakingGraph';

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

export const calculateTimeRanking = (data: TimeSlot[]): ChartData => {
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
    if (bDuration !== aDuration) {
      return bDuration - aDuration;
    }
    // 시간 길이도 같다면 시작 시간이 빠른 순으로 정렬
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });

  // 겹치는 시간 제거
  const finalRankedTimeRanges: RankedTimeSlot[] = [];
  let currentRank = 1;
  let lastUserCount = -1;
  let lastDuration = -1;

  rankedTimeRanges.forEach((range) => {
    if (!isOverlapping(range, finalRankedTimeRanges)) {
      const duration =
        new Date(range.endTime).getTime() - new Date(range.startTime).getTime();

      // 동점 처리: 사용자 수와 시간 길이가 이전 항목과 같으면 같은 랭크 부여
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
// 시간이 연속적인지 확인해주는 함수
const isConsecutiveTime = (time1: string, time2: string) => {
  const time1Obj = new Date(time1);
  const time2Obj = new Date(time2);

  return time1Obj.getTime() + 30 * 60 * 1000 === time2Obj.getTime();
};
