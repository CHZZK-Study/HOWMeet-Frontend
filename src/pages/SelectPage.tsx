import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import SelectableTimeTable from '@/components/meeting/select/SelectableTimeTable';
import TimeSelectModalComp from '@/components/meeting/select/TimeSelectCompModal';
import TimeSelectTitle from '@/components/meeting/select/TimeSelectTitle';
import useModal from '@/hooks/useModal';
import useToolTip from '@/hooks/useToolTip';
import { TimeTableServerInfoProps } from '@/mocks/data/timeTableData';
import { useTimeStore } from '@/store/meeting/useTimeStore';
import {
  ButtonContainer,
  NormalContainer,
} from '@/styles/components/container';
import { TimeTableData } from '@/types/timeTableTypes';
import {
  formatPostDateTime,
  formatServerToTimeTableData,
} from '@/utils/meeting/timetable/formatDateTime';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

function SelectPage() {
  const { selectedTimes } = useTimeStore();
  const { closeModal, isOpen, openModal } = useModal();
  const { isToolTipOpen, closeToolTip } = useToolTip();
  const [isSelected, setIsSelected] = useState(false);

  const handleReWrite = () => {
    setIsSelected(false);
  };
  const { isLoading, isError, data } = useQuery<TimeTableServerInfoProps>({
    queryKey: ['TimeTableServerInfo'],
    queryFn: () => fetch('/timeTableData').then((res) => res.json()),
  });

  // 로딩 상태 처리
  if (isLoading) {
    console.log('isLoading: ', isLoading);
    return <div>로딩중...</div>;
  }

  // 오류 상태 처리
  if (isError) return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;

  // data가 undefined가 아닌지 확인
  if (!data) return <div>데이터를 불러오지 못했습니다.</div>;

  const timeTableData: TimeTableData = formatServerToTimeTableData(data);

  const handleModalOpen = () => {
    openModal();
    setIsSelected(true);
    toast.success('🎉 정보가 성공적으로 저장되었습니다!');
    console.log('selectedTimes: ', formatPostDateTime(selectedTimes));
  };

  return (
    <NormalContainer>
      <Header
        title="일정 조율"
        isShare
        toggle={closeToolTip}
        isVisible={isToolTipOpen}
      />
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
          $theme="primary"
          disabled={selectedTimes.length === 0}
        >
          {isSelected ? '수정하기' : '시간 선택 완료'}
        </Button>
      </ButtonContainer>
      {isOpen && <TimeSelectModalComp handleModalClose={closeModal} />}
    </NormalContainer>
  );
}

export default SelectPage;
