import { TimeSlot, TimeTableData } from '@/types/timeTableTypes';

const formatDateTime = (time: {
  hour: string;
  minute: string;
  day: string;
  date: string;
  month: string;
}): string => {
  const year = new Date().getFullYear();
  const [month, date] = time.month.split('/');
  const formattedMonth = month.padStart(2, '0');
  const formattedDate = date.padStart(2, '0');
  const formattedHour = time.hour.padStart(2, '0');
  const formattedMinute = time.minute;

  return `${year}-${formattedMonth}-${formattedDate}T${formattedHour}:${formattedMinute}`;
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

export default formatDateTime;

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

const generateHoursRange = (start: string, end: string): string[] => {
  const startHour = parseInt(start.split('T')[1].split(':')[0], 10);
  const endHour = parseInt(end.split('T')[1].split(':')[0], 10);
  const hours = [];

  for (let hour = startHour; hour <= endHour; hour += 1) {
    hours.push(String(hour).padStart(2, '0'));
  }

  return hours;
};

export const formatTimeTableData = (data: string[]): TimeTableData => {
  data.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const start = data[0];
  const end = data[data.length - 1];
  const isStartHalfMinute = start.split('T')[1].split(':')[1] === '30';
  const isEndHalfMinute = end.split('T')[1].split(':')[1] === '30';
  const dateRange = generateDateRange(start, end);
  const hoursRange = generateHoursRange(start, end);

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
