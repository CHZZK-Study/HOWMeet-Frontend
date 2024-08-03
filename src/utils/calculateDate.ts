const calculateDate = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const differ = end.getTime() - start.getTime();

  return differ / (1000 * 3600 * 24);
};

export default calculateDate;
