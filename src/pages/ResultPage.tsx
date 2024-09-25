import { axiosInstance } from '@/apis/instance';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import ResultInfoComp, {
  BackLayout,
  Container,
} from '@/components/meeting/result/ResultInfoComp';
import ResultNavbar from '@/components/meeting/result/ResultNavbar';
import UrlShareModal from '@/components/meeting/result/UrlShareModal';
import useModal from '@/hooks/useModal';
import useTimeTableData from '@/hooks/useTimeTableData';
import {
  ButtonContainer,
  NormalContainer,
} from '@/styles/components/container';
import { ResultHeatmapProps, TimeTableData } from '@/types/timeTableTypes';
import {
  formatResultTime,
  formatServerToTimeTableData,
} from '@/utils/meeting/timetable/formatDateTime';
import { useQuery } from '@tanstack/react-query';
import ResultTimeTable from '@/components/meeting/result/ResultTimeTable';

function ResultPage() {
  const { isOpen, closeModal, openModal } = useModal();

  const {
    isTimeTableLoading,
    roomId,
    meetingId,
    timeTableServerData,
    isError,
  } = useTimeTableData();

  const { isLoading, error, data } = useQuery<ResultHeatmapProps>({
    queryKey: ['selectedTimeData'],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/confirm/${roomId}/${meetingId}`
      );
      console.log(response);
      return response.data; // 데이터 반환
    },
  });
  if (isLoading || !timeTableServerData || !data || isTimeTableLoading)
    return (
      <NormalContainer>
        <Header title="일정 조율" />
        <ResultNavbar />

        <BackLayout>
          <Container />
        </BackLayout>

        {isOpen && <UrlShareModal handleModalClose={closeModal} />}
      </NormalContainer>
    );
  if (error || isError) return <div>에러가 발생했습니다</div>;
  if (!data) return <div>데이터가 없습니다</div>;

  const timeTableData: TimeTableData =
    formatServerToTimeTableData(timeTableServerData);

  console.log(timeTableData);
  const handleClick = () => {
    openModal();
  };

  return (
    <NormalContainer>
      <Header title="일정 조율" />
      <ResultNavbar />
      <ResultInfoComp
        decidedTime={formatResultTime(data.confirmTime)}
        title={data.roomName}
        participants={data.participantPerson}
      />
      <BackLayout>
        <Container>
          <ResultTimeTable
            roomInfo={data}
            timetableInfo={timeTableData}
            dragDisabled
          />
        </Container>
      </BackLayout>
      <ButtonContainer center>
        <Button
          $style="solid"
          $theme="primary-purple"
          onClick={handleClick}
          style={{ width: '95%' }}
        >
          공유하기
        </Button>
      </ButtonContainer>
      {isOpen && <UrlShareModal handleModalClose={closeModal} />}
    </NormalContainer>
  );
}

export default ResultPage;
