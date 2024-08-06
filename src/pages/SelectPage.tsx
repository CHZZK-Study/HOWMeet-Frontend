import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import HowmeetHeader from '@/components/common/HowmeetHeader';
import MeetingHeader from '@/components/meeting/meetingHeader';
import TimeSelect from '@/components/meeting/select/TimeSelect';
import TimeSelectTitle from '@/components/meeting/select/TimeSelectTitle';
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
  return (
    <Container>
      <HowmeetHeader />
      <MeetingHeader />
      <TimeSelectTitle />
      <TimeSelect data={timeTableData} />
      <ButtonContainer>
        <Button $style="solid" disabled>
          확인
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default SelectPage;

const ButtonContainer = styled.div`
  bottom: 0;
  width: 100%;
  padding: 20px 16px;
  background: ${({ theme }) => theme.color.primary.white};
  box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.04);
  z-index: 10;
`;

const Container = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  width: 100%;
`;
