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
  // formatTimeTableData,
  // formatServerToTimeTableData,
} from '@/utils/meeting/timetable/formatDateTime';
import AttendStatusHeader from '@/components/meeting/result/AttendStatusHeader';
import useModal from '@/hooks/useModal';
import ResultTimeSelectModal from '@/components/meeting/result/ResultTimeSelectModal';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '@/apis/instance';
import { TimeTableServerInfoProps } from '@/mocks/data/timeTableData';
// import { TimeTableServerInfoProps } from '@/mocks/data/timeTableData';

function DecisionPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading: isTimeTableLoading, data: timeTableServerData } =
    useQuery<TimeTableServerInfoProps>({
      queryKey: ['TimeTableServerInfo'],
      queryFn: () => fetch('/guest-schedule/1').then((res) => res.json()),
      // queryFn: async () => {
      //   const response = await axiosInstance.get('/guest-schedule/2');
      //   console.log(response);
      //   return response.data; // 데이터 반환
      // },
    });

  const { isLoading, error, data } = useQuery<ResultHeatmapProps>({
    queryKey: ['selectedTimeData'],
    queryFn: () => fetch('/gs-record/1').then((res) => res.json()),
    // queryFn: async () => {
    //   const response = await axiosInstance.get('/gs-record/1', {
    //     headers: {
    //       Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJpZFwiOjEsXCJuaWNrbmFtZVwiOlwi6rmA66-87JqwXCIsXCJyb2xlXCI6XCJURU1QT1JBUllcIixcImd1ZXN0XCI6dHJ1ZSxcIm1lbWJlclwiOmZhbHNlfSIsImlhdCI6MTcyMjQ4NjkwNywiZXhwIjoxNzIyNDkwNTA3fQ.qp9uZqvGbRRGi41af05poj98WjB7DeEGSwJrXNORm7HId9v_gojtZvVaRkCSNM2kSFCn54xm2QyKhXQsTlKV6g`,
    //     },
    //   });
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

  //   {
  //     "msId":"12",
  //     "time":[
  //         "2023-01-01T14:30",
  //         "2023-01-01T15:00"
  //     ],
  //     "participantPerson" :["오영","예진","채림","세종"]
  // } 이형식으로 보내기
  const handleDecide = () => {
    setIsSelected(true);
    navigate(`/meeting/${id}/result`);
    const postParticipantPerson = formatPostParticipantPerson(selectedResult);
    const postDateTime = formatPostDateTime(selectedResult);
    const postData = {
      msId: id,
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
      <ButtonContainer>
        <Button
          $style="solid"
          onClick={openModal}
          $theme="primary"
          disabled={selectedResult.length === 0}
        >
          {selectedResult.length === 0
            ? '드래그로 시간 확정하기'
            : '일정 확정하기'}
        </Button>
      </ButtonContainer>
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
