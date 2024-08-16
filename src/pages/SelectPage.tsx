import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import TimeSelect from '@/components/meeting/select/TimeSelect';
import TimeSelectModalComp from '@/components/meeting/select/TimeSelectCompModal';
import TimeSelectTitle from '@/components/meeting/select/TimeSelectTitle';
import { useTimeStore } from '@/store/meeting/useTimeStore';

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
  const [isSelected, setIsSelected] = useState(false);

  const handleReWrite = () => {
    setIsSelected(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
    setIsSelected(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
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
      <TimeSelect data={timeTableData} dragDisabled={isSelected} />
      <ButtonContainer>
        <Button
          onClick={isSelected ? handleReWrite : handleModalOpen}
          $style="solid"
          disabled={selectedTimes.length === 0}
        >
          {isSelected ? '수정하기' : '시간 선택 완료'}
        </Button>
      </ButtonContainer>
      {openModal && <TimeSelectModalComp handleModalClose={handleModalClose} />}
    </NormalContainer>
  );
}

export default SelectPage;
