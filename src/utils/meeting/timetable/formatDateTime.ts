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

export default formatDateTime;
