import { useState } from 'react';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import ResultTimeTable from '@/components/meeting/result/ResultTimeTable';
import {
  ButtonContainer,
  FlexColContainer,
  NormalContainer,
} from '@/styles/components/container';
import { useTimeStore } from '@/store/meeting/useTimeStore';
import {
  formatPostDateTime,
  formatPostParticipantPerson,
  formatServerToTimeTableData,
} from '@/utils/meeting/timetable/formatDateTime';
import AttendStatusHeader from '@/components/meeting/result/AttendStatusHeader';
import useModal from '@/hooks/useModal';
import ResultTimeSelectModal from '@/components/meeting/result/ResultTimeSelectModal';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/apis/instance';
import useTimeTableData from '@/hooks/useTimeTableData';
import { toast } from 'sonner';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

function DecisionPage() {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const { isOpen, closeModal, openModal } = useModal();
  const { selectedResult } = useTimeStore();
  const {
    isGuest,
    isTimeTableLoading,
    meetingId,
    timeTableServerData,
    roomId,
    selectedTimeData,
    isSelectTimeDataLoading,
    isSelectedTimeDataError,
    isLeader,
    handleLeftArrowIconClick,
  } = useTimeTableData();

  if (
    isSelectTimeDataLoading ||
    !timeTableServerData ||
    !selectedTimeData ||
    isTimeTableLoading
  ) {
    return (
      <NormalContainer>
        <Header
          title="일정 조율"
          onLeftArrowIconClick={handleLeftArrowIconClick}
        />
        <FlexColContainer>
          <br />
          <Skeleton height={50} width={400} count={1} />
          <br />
          <Skeleton height={600} width={400} count={1} />
          <br />
          <Skeleton height={50} width={400} count={1} />
        </FlexColContainer>
      </NormalContainer>
    );
  }
  if (isSelectedTimeDataError) return <div>에러가 발생했습니다</div>;
  const handleNavigateToSelect = () => {
    navigate(`/meeting/${roomId}/select/${meetingId}`);
  };

  const handleDecide = async () => {
    setIsSelected(true);
    const postParticipantPerson = formatPostParticipantPerson(selectedResult);
    const postDateTime = formatPostDateTime(selectedResult);

    await axiosInstance.post(`confirm/${meetingId}`, {
      msId: meetingId,
      time: [postDateTime[0], postDateTime[postDateTime.length - 1]],
      participantPerson: postParticipantPerson,
    });
    navigate(`/meeting/${roomId}/result/${meetingId}`);
    toast.message('정보가 성공적으로 저장되었습니다!');
  };

  const timeTableData = formatServerToTimeTableData(timeTableServerData);

  return (
    <NormalContainer>
      <Header
        title="일정 조율"
        onLeftArrowIconClick={handleLeftArrowIconClick}
      />
      <AttendStatusHeader
        TotalPersonnel={selectedTimeData.totalPersonnel.length}
        currentParticipants={selectedTimeData.participatedPersonnel.length}
        participatedPersonnel={selectedTimeData.participatedPersonnel}
        unParticipatedPersonnel={selectedTimeData.totalPersonnel.filter(
          (name) => !selectedTimeData.participatedPersonnel.includes(name)
        )}
      />
      <ResultTimeTable
        timetableInfo={timeTableData}
        roomInfo={selectedTimeData}
        dragDisabled={isSelected || isGuest}
      />
      {isGuest ? null : (
        <ButtonContainer center>
          {isLeader ? (
            <>
              <RewriteButton onClick={handleNavigateToSelect}>
                다시 선택하기
              </RewriteButton>
              <Button
                $style="solid"
                onClick={openModal}
                $theme="primary-purple"
                disabled={selectedResult.length === 0}
                style={{ width: '95%' }}
              >
                {selectedResult.length === 0
                  ? '드래그로 시간 확정하기'
                  : '일정 확정하기'}
              </Button>
            </>
          ) : (
            <Button
              $style="solid"
              onClick={handleNavigateToSelect}
              $theme="primary-purple"
              style={{ width: '95%' }}
            >
              수정하기
            </Button>
          )}
        </ButtonContainer>
      )}
      {isOpen ? (
        <ResultTimeSelectModal
          handleModalClose={closeModal}
          decidedTime={selectedResult}
          handleDecide={handleDecide}
        />
      ) : null}
    </NormalContainer>
  );
}

export default DecisionPage;

const RewriteButton = styled.div`
  width: fit-content;
  height: fit-content;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.secondary.solid.bk[400]};
  padding: 5px 15px;
  cursor: pointer;
  margin: 10px 0;
  border-bottom: 2px solid ${({ theme }) => theme.color.secondary.solid.bk[400]};
`;
