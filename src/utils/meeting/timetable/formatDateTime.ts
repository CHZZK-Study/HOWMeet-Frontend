import { TimeSlot } from '@/types/timeTableTypes';

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
