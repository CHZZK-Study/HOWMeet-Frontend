import {
  ResultHeatmapCellInfo,
  TimeSlot,
  TimeTableData,
  TimeTableServerInfoProps,
} from '@/types/timeTableTypes';

// export const formatDateTime = (time: {
//   hour: string;
//   minute: string;
//   day: string;
//   date: string;
//   month: string;
// }): string => {
//   const year = new Date().getFullYear();
//   const [month, date] = time.month.split('/');
//   const formattedMonth = month.padStart(2, '0');
//   const formattedDate = date.padStart(2, '0');
//   const formattedHour = time.hour.padStart(2, '0');
//   const formattedMinute = time.minute;

//   return `${year}-${formattedMonth}-${formattedDate}T${formattedHour}:${formattedMinute}`;
// };

export const formatPostParticipantPerson = (data: ResultHeatmapCellInfo[]) => {
  const participantPerson = data.map((time) => {
    return time.users;
  });
  return [...new Set(participantPerson.flat())];
};

export const formatPostDateTime = (data: TimeSlot[]) => {
  const formatDateTimeSlots = data.map((time) => {
    return `${time.date}T${time.hour}:${time.minute}`;
  });
  const sortedTimeSlots = formatDateTimeSlots.sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return sortedTimeSlots;
};

const getDay = (date: string): string => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const [year, month, day] = date.split('-').map((part) => parseInt(part, 10));
  const parsedDate = new Date(year, month - 1, day);

  const dayIndex = parsedDate.getDay();
  return days[dayIndex];
};

const generateDateRange = (start: string, end: string): string[] => {
  const startDate = new Date(start.split('T')[0]);
  const endDate = new Date(end.split('T')[0]);
  const dateArray = [];

  while (startDate <= endDate) {
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0');
    const day = String(startDate.getDate()).padStart(2, '0');
    dateArray.push(`${year}-${month}-${day}`);
    startDate.setDate(startDate.getDate() + 1);
  }

  return dateArray;
};

const generateHoursRange = (
  start: string,
  end: string,
  isEndHalfMinute: boolean
): string[] => {
  const startHour = parseInt(start.split('T')[1].split(':')[0], 10);
  const endHour = parseInt(end.split('T')[1].split(':')[0], 10);
  const hours = [];

  if (isEndHalfMinute) {
    for (let hour = startHour; hour <= endHour; hour += 1) {
      hours.push(String(hour).padStart(2, '0'));
    }
  } else {
    for (let hour = startHour; hour < endHour; hour += 1) {
      hours.push(String(hour).padStart(2, '0'));
    }
  }
  return hours;
};

export const formatServerToTimeTableData = (
  data: TimeTableServerInfoProps
): TimeTableData => {
  const start = data.dates[0];
  const end = data.dates[1];
  const { startTime } = data.time;
  const { endTime } = data.time;
  const { containsMidnight } = data.time;
  const isStartHalfMinute = startTime.split(':')[1] === '30';
  const isEndHalfMinute = endTime.split(':')[1] === '30';
  const dateRange = generateServerDateRange(start, end);

  let hoursRange: string[];
  if (containsMidnight) {
    hoursRange = [
      ...generateServerHoursRange('00:00', endTime, isEndHalfMinute),
      ...generateServerHoursRange(startTime, '24:00', isStartHalfMinute),
    ];
  } else {
    hoursRange = generateServerHoursRange(startTime, endTime, isEndHalfMinute);
  }

  const days: string[] = [];
  const dates: string[] = [];
  const months: string[] = [];

  dateRange.forEach((date: string) => {
    days.push(getDay(date));
    dates.push(date);

    const [, month, dayPart] = date.split('-');
    months.push(`${parseInt(month, 10)}/${parseInt(dayPart, 10)}`);
  });

  return {
    hours: hoursRange,
    days,
    dates,
    months,
    isEndHalfMinute,
    isStartHalfMinute,
    startHour: startTime.split(':')[0],
    endHour: endTime.split(':')[0],
    isContainMidnight: containsMidnight,
  };
};

const generateServerHoursRange = (
  start: string,
  end: string,
  isEndHalfMinute: boolean
): string[] => {
  const startHour = parseInt(start.split(':')[0], 10);
  const endHour = parseInt(end.split(':')[0], 10);
  const hours = [];

  if (startHour > endHour) {
    for (let hour = startHour; hour < 24; hour += 1) {
      hours.push(String(hour).padStart(2, '0'));
    }
    for (let hour = 0; hour <= endHour; hour += 1) {
      hours.push(String(hour).padStart(2, '0'));
    }
  } else if (isEndHalfMinute) {
    for (let hour = startHour; hour <= endHour; hour += 1) {
      hours.push(String(hour).padStart(2, '0'));
    }
  } else {
    for (let hour = startHour; hour < endHour; hour += 1) {
      hours.push(String(hour).padStart(2, '0'));
    }
  }
  return hours;
};

// const generateServerHoursRange = (
//   start: string,
//   end: string,
//   isEndHalfMinute: boolean
// ): string[] => {
//   const startHour = parseInt(start.split(':')[0], 10);
//   const endHour = parseInt(end.split(':')[0], 10);
//   const hours = [];

//   if (isEndHalfMinute) {
//     for (let hour = startHour; hour <= endHour; hour += 1) {
//       hours.push(String(hour).padStart(2, '0'));
//     }
//   } else {
//     for (let hour = startHour; hour < endHour; hour += 1) {
//       hours.push(String(hour).padStart(2, '0'));
//     }
//   }
//   return hours;
// };

const generateServerDateRange = (start: string, end: string): string[] => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const dateArray = [];

  while (startDate <= endDate) {
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, '0');
    const day = String(startDate.getDate()).padStart(2, '0');
    dateArray.push(`${year}-${month}-${day}`);
    startDate.setDate(startDate.getDate() + 1);
  }

  return dateArray;
};

export const formatTimeTableData = (data: string[]): TimeTableData => {
  data.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const start = data[0];
  const end = data[data.length - 1];
  const isStartHalfMinute = start.split('T')[1].split(':')[1] === '30';
  const isEndHalfMinute = end.split('T')[1].split(':')[1] === '30';
  const dateRange = generateDateRange(start, end);
  const hoursRange = generateHoursRange(start, end, isEndHalfMinute);

  const days: string[] = [];
  const dates: string[] = [];
  const months: string[] = [];

  dateRange.forEach((date: string) => {
    days.push(getDay(date));
    dates.push(date);

    const [, month, dayPart] = date.split('-');
    months.push(`${parseInt(month, 10)}/${parseInt(dayPart, 10)}`);
  });

  return {
    hours: hoursRange,
    days,
    dates,
    months,
    isEndHalfMinute,
    isStartHalfMinute,
    startHour: start.split('T')[1].split(':')[0].split(':')[0],
    endHour: end.split('T')[1].split(':')[0].split(':')[0],
    isContainMidnight:
      start.split('T')[1].split(':')[0] > end.split('T')[1].split(':')[0],
  };
};

export const formatResultTime = (dateTimes: string[]): string => {
  if (dateTimes.length === 0) return '';

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const firstDate = new Date(dateTimes[0]);
  const lastDate = new Date(dateTimes[dateTimes.length - 1]);

  const month = firstDate.getMonth() + 1;
  const day = firstDate.getDate();
  const dayOfWeek = daysOfWeek[firstDate.getDay()];

  const startHour = firstDate.getHours();
  const endHour = lastDate.getHours() + 1;

  return `${month}월 ${day}일(${dayOfWeek}) ${startHour}~${endHour}`;
};
