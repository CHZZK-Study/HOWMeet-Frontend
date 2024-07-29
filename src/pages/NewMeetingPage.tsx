import TimeSelect from '@/components/meeting/TimeSelect';

function NewMeetingPage() {
  const timeTableData = {
    hours: [
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
    ],
    days: ['월', '화', '수', '목', '금', '토', '일'],
    dates: ['1', '2', '3', '4', '5', '6', '7'],
    months: ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6', '7/7'],
  };
  return <TimeSelect data={timeTableData} />;
}

export default NewMeetingPage;
