import ArrowNavbar from '@/components/common/ArrowNavbar';
import Button from '@/components/common/Button';
import TimeSelect from '@/components/meeting/TimeSelect';
import TimeSelectTitle from '@/components/meeting/TimeSelectTitle';

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
    days: ['월', '화', '수'],
    dates: ['1', '2', '3'],
    months: ['7/1', '7/2', '7/3'],
  };
  return (
    <>
      <ArrowNavbar title="새로운 미팅" arrowPosition="left" />
      <TimeSelectTitle />
      <TimeSelect data={timeTableData} />
      <Button>시간 선택 완료</Button>
    </>
  );
}

export default NewMeetingPage;
