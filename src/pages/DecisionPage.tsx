import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import ResultTimeTable from '@/components/meeting/result/ResultTimeTable';
import { ResultHeatmapProps } from '@/types/timeTableTypes';
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
    token,
    roomId,
  } = useTimeTableData();

  const { isLoading, error, data } = useQuery<ResultHeatmapProps>({
    queryKey: ['selectedTimeData'],
    queryFn: async () => {
      // 여기도 토큰 넣으셈
      const headers = isGuest ? {} : { Authorization: `Bearer ${token}` };
      const response = await axiosInstance.get(
        `/${isGuest ? 'gs-record' : `ms-record/${roomId}`}/${meetingId}`,
        { headers }
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
    const headers = isGuest
      ? {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJpZFwiOjMsXCJuaWNrbmFtZVwiOlwi7LWc7LGE66a8XCIsXCJyb2xlXCI6XCJURU1QT1JBUllcIixcIm1lbWJlclwiOmZhbHNlLFwiZ3Vlc3RcIjp0cnVlfSIsImlhdCI6MTcyNzE5NTcyMCwiZXhwIjoxNzI3MTk5MzIwfQ.DxG95w96ceWVNRUIExB8axSbiKE-793STYBS-TnENFUFRk4TkVo7NyVZBoy8vdfZiYp7UThjGC1PsaBcN8jigA',
        }
      : { Authorization: `Bearer ${token}` };

    await axiosInstance.post(
      `confirm/${meetingId}`,
      {
        msId: meetingId,
        time: [postDateTime[0], postDateTime[postDateTime.length - 1]],
        participantPerson: postParticipantPerson,
      },
      { headers }
    );
    toast.message('정보가 성공적으로 저장되었습니다!');
  };

  const timeTableData = formatServerToTimeTableData(timeTableServerData);

  const printResult = () => {
    const postParticipant = formatPostParticipantPerson(selectedResult);
    const postDate = formatPostDateTime(selectedResult);

    console.log('postParticipant', postParticipant);
    console.log('postDate', postDate);
  };

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
          <Button
            $style="solid"
            onClick={() => {
              openModal();
              printResult();
            }}
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
