import { axiosInstance } from '@/apis/instance';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import SelectableTimeTable from '@/components/meeting/select/SelectableTimeTable';
import TimeSelectModalComp from '@/components/meeting/select/TimeSelectCompModal';
import TimeSelectTitle from '@/components/meeting/select/TimeSelectTitle';
import useModal from '@/hooks/useModal';
import useToolTip from '@/hooks/useToolTip';
import { useTimeStore } from '@/store/meeting/useTimeStore';
import {
  ButtonContainer,
  FlexColContainer,
  NormalContainer,
} from '@/styles/components/container';
import { TimeTableData } from '@/types/timeTableTypes';
import {
  formatPostDateTime,
  formatServerToTimeTableData,
} from '@/utils/meeting/timetable/formatDateTime';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Skeleton from 'react-loading-skeleton'; // 추가
import 'react-loading-skeleton/dist/skeleton.css';
import useTimeTableData from '@/hooks/useTimeTableData';
import { useRedirect } from '@/hooks/useRedirect';

function SelectPage() {
  useRedirect();
  const navigate = useNavigate();
  const { selectedTimes } = useTimeStore();
  const { closeModal, isOpen, openModal } = useModal();
  const { isToolTipOpen, closeToolTip } = useToolTip();
  const [isSelected, setIsSelected] = useState(false);

  const handleReWrite = () => {
    setIsSelected(false);
  };

  const {
    isGuest,
    isTimeTableLoading,
    meetingId,
    timeTableServerData,
    isError,
    user,
    isLeader,
    roomId,
    isMemberLoading,
    handleLeftArrowIconClick,
  } = useTimeTableData(true);

  const handlePreviousBtnClick = () => {
    return isGuest ? handleLeftArrowIconClick() : navigate(`/room/${roomId}`);
  };
  // 로딩 상태 처리
  if (isTimeTableLoading || !timeTableServerData || isMemberLoading) {
    return (
      <NormalContainer>
        <Header
          title="일정 조율"
          isShare
          toggle={closeToolTip}
          isVisible={isToolTipOpen}
          onLeftArrowIconClick={handlePreviousBtnClick}
        />
        <TimeSelectTitle
          Title={
            isSelected
              ? `${user?.username}님이 제출한 시간을 확인해보세요`
              : `가능한 시간을 드래그 해주세요!`
          }
        />
        <FlexColContainer>
          <Skeleton height={600} width={400} count={1} />
          <br />
          <Skeleton height={50} width={400} count={1} />
        </FlexColContainer>

        {isOpen && <TimeSelectModalComp handleModalClose={closeModal} />}
      </NormalContainer>
    );
  }

  if (isError) return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;

  if (!timeTableServerData) return <div>데이터를 불러오지 못했습니다.</div>;

  const timeTableData: TimeTableData =
    formatServerToTimeTableData(timeTableServerData);

  const handleModalOpen = async () => {
    try {
      const formattedTimes = formatPostDateTime(selectedTimes);

      try {
        await axiosInstance.post(`${isGuest ? 'gs-record' : 'ms-record'}`, {
          [isGuest ? 'gsId' : 'msId']: meetingId,
          selectTime: formattedTimes,
        });
        toast.message('정보가 성공적으로 저장되었습니다!');

        if (isGuest) {
          navigate(`/meeting/${roomId}/decision/${meetingId}`);
        } else {
          openModal();
        }
        setIsSelected(true);
      } catch (error) {
        toast.error('정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
        setIsSelected(false);
      }
    } catch (error) {
      toast.error('정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <NormalContainer>
      <Header
        title="일정 조율"
        isShare
        toggle={closeToolTip}
        isVisible={isToolTipOpen}
        onLeftArrowIconClick={handlePreviousBtnClick}
      />
      <TimeSelectTitle
        Title={
          isSelected
            ? `${user?.username}님이 제출한 시간을 확인해보세요`
            : `가능한 시간을 드래그 해주세요!`
        }
      />

      <SelectableTimeTable data={timeTableData} dragDisabled={isSelected} />
      <ButtonContainer center>
        <Button
          onClick={isSelected ? handleReWrite : handleModalOpen}
          $style="solid"
          $theme="primary-purple"
          disabled={selectedTimes.length === 0}
          style={{ width: '95%' }}
        >
          {isSelected ? '수정하기' : '시간 선택 완료'}
        </Button>
      </ButtonContainer>
      {isOpen && (
        <TimeSelectModalComp
          handleModalClose={() => {
            closeModal();
            if (isLeader) {
              navigate(`/meeting/${roomId}/decision/${meetingId}`);
            }
          }}
        />
      )}
    </NormalContainer>
  );
}

export default SelectPage;
