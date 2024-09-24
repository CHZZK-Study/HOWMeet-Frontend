import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import ResultTimeTable from '@/components/meeting/result/ResultTimeTable';
import { ResultHeatmapProps } from '@/types/timeTableTypes';
import {
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
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '@/apis/instance';
import { TimeTableServerInfoProps } from '@/mocks/data/timeTableData';
import useUserStore from '@/store/userStore';

function DecisionPage() {
  const navigate = useNavigate();
  const { roomId, meetingId } = useParams();
  const { user } = useUserStore();
  const isGuest = user?.isMember;

  const { isLoading: isTimeTableLoading, data: timeTableServerData } =
    useQuery<TimeTableServerInfoProps>({
      queryKey: ['TimeTableServerInfo'],
      // queryFn: () =>
      //   fetch(`/${isGuest ? `guest` : `member`}-schedule/${roomId}`).then(
      //     (res) => res.json()
      //   ),
      queryFn: async () => {
        const response = await axiosInstance.get(
          `/${isGuest ? `guest-schedule/${meetingId}` : `room/${roomId}/${meetingId}`}`
        );
        return response.data; // 데이터 반환
      },
    });

  const { isLoading, error, data } = useQuery<ResultHeatmapProps>({
    queryKey: ['selectedTimeData'],
    queryFn: () =>
      fetch(`/${isGuest ? `gs-record` : `ms-record`}/${meetingId}`).then(
        (res) => res.json()
      ),
    // queryFn: async () => {
    //   const response = await axiosInstance.get(
    //     `/${isGuest ? `gs-record` : `ms-record`}/${meetingId}`
    //   );
    //   console.log(response);
    //   return response.data; // 데이터 반환
    // },
  });

  const [isSelected, setIsSelected] = useState(false);
  const { isOpen, closeModal, openModal } = useModal();
  const { selectedResult } = useTimeStore();

  if (isLoading || !timeTableServerData || !data || isTimeTableLoading) {
    return (
      <NormalContainer>
        <Header title="일정 조율" />
      </NormalContainer>
    );
  }
  if (error) return <div>에러가 발생했습니다</div>;

  const handleDecide = () => {
    setIsSelected(true);
    navigate(`/meeting/${roomId}/result/${meetingId}`);
    const postParticipantPerson = formatPostParticipantPerson(selectedResult);
    const postDateTime = formatPostDateTime(selectedResult);
    const postData = {
      msId: roomId,
      time: [postDateTime[0], postDateTime[postDateTime.length - 1]],
      participantPerson: postParticipantPerson,
    };

    console.log(postData);
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
      <FlexColContainer>
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
      </FlexColContainer>
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
