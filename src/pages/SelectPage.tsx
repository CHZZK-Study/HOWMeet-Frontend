import Button from '@/components/common/Button';
import HowMeetHeader from '@/components/common/HowMeetHeader';
import MeetingHeader from '@/components/meeting/MeetingHeader';
import TimeSelect from '@/components/meeting/select/TimeSelect';
import TimeSelectTitle from '@/components/meeting/select/TimeSelectTitle';
import { useTimeStore } from '@/store/meeting/timeStore';
import { ButtonContainer } from '@/styles/components/container';
import styled from 'styled-components';

function SelectPage() {
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

  const { selectedTimes } = useTimeStore();

  return (
    <Container>
      <HowMeetHeader />
      <MeetingHeader />
      <TimeSelectTitle />
      <TimeSelect data={timeTableData} />
      <ButtonContainer>
        <Button $style="solid" disabled={selectedTimes.length === 0}>
          확인
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default SelectPage;

const Container = styled.div`
  width: 100%;
  min-height: 100dvh;
  height: 100%;
  background: rgb(244, 245, 245);
  position: relative;
  display: flex;
  flex-direction: column;
`;
