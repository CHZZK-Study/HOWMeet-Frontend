import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import SelectableTimeTable from '@/components/meeting/select/SelectableTimeTable';
import TimeSelectModalComp from '@/components/meeting/select/TimeSelectCompModal';
import TimeSelectTitle from '@/components/meeting/select/TimeSelectTitle';
import useModal from '@/hooks/useModal';
import { useTimeStore } from '@/store/meeting/useTimeStore';
import {
  ButtonContainer,
  NormalContainer,
} from '@/styles/components/container';
import { TimeTableData } from '@/types/timeTableTypes';
import { formatPostDateTime } from '@/utils/meeting/timetable/formatDateTime';
import { useState } from 'react';

function SelectPage() {
  const timeTableData: TimeTableData = {
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
    dates: ['2024-07-01', '2024-07-02', '2024-07-03'],
    months: ['7/1', '7/2', '7/3'],
  };

  const { selectedTimes } = useTimeStore();

  const { closeModal, isOpen, openModal } = useModal();
  const [isSelected, setIsSelected] = useState(false);

  const handleReWrite = () => {
    setIsSelected(false);
  };

  const handleModalOpen = () => {
    closeModal();
    setIsSelected(true);
    console.log('selectedTimes: ', formatPostDateTime(selectedTimes));
  };

  const handleModalClose = () => {
    openModal();
  };

  return (
    <NormalContainer>
      <Header title="일정 조율" />
      <TimeSelectTitle
        Title={
          isSelected
            ? `00님이 제출한 시간을 확인해보세요`
            : `가능한 시간을 드래그 해주세요!`
        }
      />
      <SelectableTimeTable data={timeTableData} dragDisabled={isSelected} />
      <ButtonContainer>
        <Button
          onClick={isSelected ? handleReWrite : handleModalOpen}
          $style="solid"
          disabled={selectedTimes.length === 0}
        >
          {isSelected ? '수정하기' : '시간 선택 완료'}
        </Button>
      </ButtonContainer>
      {isOpen && <TimeSelectModalComp handleModalClose={handleModalClose} />}
    </NormalContainer>
  );
}

export default SelectPage;
