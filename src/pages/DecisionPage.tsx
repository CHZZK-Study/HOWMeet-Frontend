import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import ResultTimeTable from '@/components/meeting/result/ResultTimeTable';
import { DecisionHeatmapProps } from '@/types/timeTableTypes';
import {
  ButtonContainer,
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
  } = useTimeTableData();

  const { isLoading, error, data } = useQuery<DecisionHeatmapProps>({
    queryKey: ['selectedTimeData'],
    queryFn: async () => {
      // 여기도 토큰 넣으셈
      const response = await axiosInstance.get(
        `/${isGuest ? 'gs-record' : `ms-record/${roomId}`}/${meetingId}`
      );
      return response.data; // 데이터 반환
    },
  });

  if (isLoading || !timeTableServerData || !data || isTimeTableLoading) {
    return (
      <NormalContainer>
        <Header title="일정 조율" />
      </NormalContainer>
    );
  }
  if (error) return <div>에러가 발생했습니다</div>;

  const handleDecide = async () => {
    setIsSelected(true);
    navigate(`/meeting/${roomId}/result/${meetingId}`);
    const postParticipantPerson = formatPostParticipantPerson(selectedResult);
    const postDateTime = formatPostDateTime(selectedResult);

    await axiosInstance.post(`confirm/${meetingId}`, {
      msId: meetingId,
      time: [postDateTime[0], postDateTime[postDateTime.length - 1]],
      participantPerson: postParticipantPerson,
    });
    toast.message('정보가 성공적으로 저장되었습니다!');
  };

  const timeTableData = formatServerToTimeTableData(timeTableServerData);

  return (
    <NormalContainer>
      <Header title="일정 조율" />
      <AttendStatusHeader
        TotalPersonnel={data.totalPersonnel.length}
        currentParticipants={data.participatedPersonnel.length}
        participatedPersonnel={data.participatedPersonnel}
        unParticipatedPersonnel={data.totalPersonnel.filter(
          (name) => !data.participatedPersonnel.includes(name)
        )}
      />
      <ResultTimeTable
        timetableInfo={timeTableData}
        roomInfo={data}
        dragDisabled={isSelected}
      />
      {isGuest ? null : (
        <ButtonContainer center>
          <RewriteButton
            onClick={() => navigate(`/meeting/${roomId}/select/${meetingId}`)}
          >
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
  height: 50px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.secondary.solid.bk[400]};
  padding: 5px 15px;
  cursor: pointer;
  margin: 10px 0;
  border-bottom: 2px solid ${({ theme }) => theme.color.secondary.solid.bk[400]};
`;
