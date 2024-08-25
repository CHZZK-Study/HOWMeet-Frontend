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

// 요일을 한글로 반환하는 함수
const getDay = (date: string): string => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayIndex = new Date(date).getDay();
  return days[dayIndex];
};

// 입력값 예시: ['2024-07-01T10:00:00', '2024-07-02T12:00:00']
export const formatTimeTableData = (data: string[]): TimeTableData => {
  // 데이터를 날짜순으로 정렬
  data.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // 형식에 맞게 변환
  const formattedData = data.map((timeData: string) => {
    const [date, time] = timeData.split('T');
    const dates = date;
    const hours = time.split(':')[0];
    const months = `${date.split('-')[1]}/${date.split('-')[2]}`;
    const days = getDay(date);

    return {
      date: dates,
      hour: hours,
      day: days,
      month: months,
    };
  });

  // 각각의 배열을 분리하여 TimeTableData 형식으로 반환
  return {
    dates: formattedData.map((item) => item.date),
    hours: formattedData.map((item) => item.hour),
    days: formattedData.map((item) => item.day),
    months: formattedData.map((item) => item.month),
  };
};
