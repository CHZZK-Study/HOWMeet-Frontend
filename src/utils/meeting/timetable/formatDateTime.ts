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

  // 날짜 문자열을 직접 파싱 (예: '2024-06-30')
  const [year, month, day] = date.split('-').map((part) => parseInt(part, 10));
  const parsedDate = new Date(year, month - 1, day); // month는 0부터 시작하므로 -1

  const dayIndex = parsedDate.getDay(); // 0 = 일요일, 1 = 월요일, ..., 6 = 토요일
  return days[dayIndex];
};

// 시작 날짜와 종료 날짜 사이의 모든 날짜를 생성하는 함수
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

// 주어진 시간 범위에서 시간 데이터를 생성하는 함수
const generateHoursRange = (start: string, end: string): string[] => {
  const startHour = parseInt(start.split('T')[1].split(':')[0], 10);
  const endHour = parseInt(end.split('T')[1].split(':')[0], 10);
  const hours = [];

  for (let hour = startHour; hour <= endHour; hour += 1) {
    hours.push(String(hour).padStart(2, '0'));
  }

  return hours;
};

// 메인 함수
export const formatTimeTableData = (data: string[]): TimeTableData => {
  data.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // 시작 및 종료 날짜, 시간 데이터 생성
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
    // 각 날짜의 요일을 가져옴
    days.push(getDay(date));

    // 날짜 배열 추가 (형식: YYYY-MM-DD 유지)
    dates.push(date);

    // 월/일 배열 추가 (형식: M/D)
    const [, month, dayPart] = date.split('-');
    months.push(`${parseInt(month, 10)}/${parseInt(dayPart, 10)}`);
  });

  // 결과 반환
  return {
    hours: hoursRange,
    days,
    dates,
    months,
    isEndHalfMinute,
    isStartHalfMinute,
  };
};

// 입력 예시
const input = ['2024-07-01T10:00:00', '2024-07-07T21:00:00'];
const result = formatTimeTableData(input);

console.log(result);
