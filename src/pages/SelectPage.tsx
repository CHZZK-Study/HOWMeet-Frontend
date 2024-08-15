import Button from '@/components/common/Button';
import HowMeetHeader from '@/components/common/HowMeetHeader';
import MeetingHeader from '@/components/meeting/MeetingHeader';
import TimeSelect from '@/components/meeting/select/TimeSelect';
import TimeSelectModalComp from '@/components/meeting/select/TimeSelectCompModal';
import TimeSelectTitle from '@/components/meeting/select/TimeSelectTitle';
import { useTimeStore } from '@/store/meeting/timeStore';
import {
  ButtonContainer,
  NormalContainer,
} from '@/styles/components/container';
import { useState } from 'react';

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

  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <NormalContainer>
      <HowMeetHeader />
      <MeetingHeader />
      <TimeSelectTitle />
      <TimeSelect data={timeTableData} />
      <ButtonContainer>
        <Button
          onClick={handleModalOpen}
          $style="solid"
          disabled={selectedTimes.length === 0}
        >
          확인
        </Button>
      </ButtonContainer>
      {openModal && <TimeSelectModalComp handleModalClose={handleModalClose} />}
    </NormalContainer>
  );
}

export default SelectPage;
