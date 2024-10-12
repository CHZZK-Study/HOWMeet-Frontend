import { axiosInstance } from '@/apis/instance';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import ResultInfoComp, {
  BackLayout,
  Container,
  ExtendedBackLayout,
} from '@/components/meeting/result/ResultInfoComp';
import ResultNavbar from '@/components/meeting/result/ResultNavbar';
import UrlShareModal from '@/components/meeting/result/UrlShareModal';
import useModal from '@/hooks/useModal';
import useTimeTableData from '@/hooks/useTimeTableData';
import {
  ButtonContainer,
  FlexColContainer,
  NormalContainer,
} from '@/styles/components/container';
import { ResultHeatmapProps, TimeTableData } from '@/types/timeTableTypes';
import {
  formatResultTime,
  formatServerToTimeTableData,
} from '@/utils/meeting/timetable/formatDateTime';
import { useQuery } from '@tanstack/react-query';
import ResultTimeTable from '@/components/meeting/result/ResultTimeTable';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';

function ResultPage() {
  const { isOpen, closeModal, openModal } = useModal();
  const navigate = useNavigate();

  const {
    isTimeTableLoading,
    roomId,
    meetingId,
    timeTableServerData,
    isError,
  } = useTimeTableData(true);

  const handleLeftArrowIconClick = () => {
    return navigate(`/room/${roomId}`);
  };

  const { isLoading, error, data } = useQuery<ResultHeatmapProps>({
    queryKey: ['resultData'],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/confirm/${roomId}/${meetingId}`
      );
      return response.data; // 데이터 반환
    },
  });
  if (isLoading || !timeTableServerData || !data || isTimeTableLoading)
    return (
      <NormalContainer>
        <Header
          title="일정 조율"
          onLeftArrowIconClick={handleLeftArrowIconClick}
        />
        <ResultNavbar />

        <BackLayout>
          <FlexColContainer>
            <Container>
              <Skeleton height={164} width="100%" count={1} />
            </Container>
            <br />
            <Container>
              <Skeleton height={300} width="100%" count={1} />
            </Container>
            <br />
            <Skeleton height={50} width={400} count={1} />
          </FlexColContainer>
        </BackLayout>

        {isOpen && <UrlShareModal handleModalClose={closeModal} />}
      </NormalContainer>
    );
  if (error || isError) return <div>에러가 발생했습니다</div>;

  if (!data) return <div>데이터가 없습니다</div>;
  const timeTableData: TimeTableData =
    formatServerToTimeTableData(timeTableServerData);

  const handleClick = () => {
    openModal();
  };

  return (
    <NormalContainer>
      <Header
        title="일정 조율"
        onLeftArrowIconClick={handleLeftArrowIconClick}
      />
      <ResultNavbar />
      <ResultInfoComp
        decidedTime={formatResultTime(data.confirmTime)}
        title={data.roomName}
        participants={data.participantPerson}
      />
      <ExtendedBackLayout>
        <Container>
          <ResultTimeTable
            roomInfo={data}
            timetableInfo={timeTableData}
            dragDisabled
          />
        </Container>
      </ExtendedBackLayout>
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
