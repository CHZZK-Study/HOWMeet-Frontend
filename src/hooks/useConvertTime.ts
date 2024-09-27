const useConvertTime = () => {
  const convertTimeToPm = (time: string) => {
    let convertedTime = '';
    const [hour, minute] = time.split(' ')[1].split(':');
    if (time.includes('오후')) convertedTime = String(Number(hour) + 12);
    else convertedTime = hour.length === 1 ? `0${hour}` : hour;
    return `${convertedTime}:${minute}:00`;
  };
  return { convertTimeToPm };
};
export default useConvertTime;
