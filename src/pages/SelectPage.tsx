import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import SelectableTimeTable from '@/components/meeting/select/SelectableTimeTable';
import TimeSelectModalComp from '@/components/meeting/select/TimeSelectCompModal';
import TimeSelectTitle from '@/components/meeting/select/TimeSelectTitle';
import { PATH } from '@/constants/path';
import useModal from '@/hooks/useModal';
import { useTimeStore } from '@/store/meeting/useTimeStore';
import useUserStore from '@/store/userStore';
import {
  ButtonContainer,
  NormalContainer,
} from '@/styles/components/container';
import { TimeTableData } from '@/types/timeTableTypes';
import {
  formatPostDateTime,
  formatTimeTableData,
} from '@/utils/meeting/timetable/formatDateTime';
import { useEffect, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { toast } from 'sonner';

function SelectPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { meetingId } = useParams();
  const [searchParams] = useSearchParams();
  const user = useUserStore((state) => state.user);
  const timeTableData: TimeTableData = formatTimeTableData([
    '2024-07-01T11:00',
    '2024-07-07T22:00',
  ]);

  useEffect(() => {
    if (!user) {
      const isGuest = searchParams.get('isGuest') === 'true';
      navigate(
        `${PATH.login}?meetingId=${meetingId}&loginType=${isGuest ? 'non-member' : 'member'}&callbackUrl=${pathname}`,
        { replace: true }
      );
    }
  }, []);

  console.log('timeTableData: ', timeTableData);
  const { selectedTimes } = useTimeStore();

  const { closeModal, isOpen, openModal } = useModal();
  const [isSelected, setIsSelected] = useState(false);

  const handleReWrite = () => {
    setIsSelected(false);
  };

  const handleModalOpen = () => {
    openModal();
    setIsSelected(true);
    toast.success('🎉 정보가 성공적으로 저장되었습니다!');
    console.log('selectedTimes: ', formatPostDateTime(selectedTimes));
  };

  return (
    <NormalContainer>
      <Header title="일정 조율" isShare />
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
          $theme="primary-purple"
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
