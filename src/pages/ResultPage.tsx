import { axiosInstance } from '@/apis/instance';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import ResultInfoComp, {
  BackLayout,
  Container,
} from '@/components/meeting/result/ResultInfoComp';
import ResultNavbar from '@/components/meeting/result/ResultNavbar';
import ResultTimeTable from '@/components/meeting/result/ResultTimeTable';
import UrlShareModal from '@/components/meeting/result/UrlShareModal';
import useModal from '@/hooks/useModal';
import {
  ButtonContainer,
  NormalContainer,
} from '@/styles/components/container';
import { ResultHeatmapProps, TimeTableData } from '@/types/timeTableTypes';
import {
  formatResultTime,
  formatTimeTableData,
} from '@/utils/meeting/timetable/formatDateTime';
import { useQuery } from '@tanstack/react-query';

function ResultPage() {
  const { isOpen, closeModal, openModal } = useModal();

  const timeTableData: TimeTableData = formatTimeTableData([
    '2024-07-01T10:30',
    '2024-07-07T22:30',
  ]);

  const { isLoading, error, data } = useQuery<ResultHeatmapProps>({
    queryKey: ['selectedTimeData'],
    // queryFn: () => fetch('/gs-record/1').then((res) => res.json()),
    queryFn: async () => {
      const response = await axiosInstance.get('/gs-record/1');
      console.log(response);
      return response.data; // 데이터 반환
    },
  });

  console.log(data);

  if (isLoading)
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
  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return <div>데이터가 없습니다</div>;

  const handleClick = () => {
    openModal();
  };

  const dateTimes = [
    '2024-07-01T16:00',
    '2024-07-01T16:30',
    '2024-07-01T17:00',
    '2024-07-01T17:30',
    '2024-07-01T18:00',
  ];

  return (
    <NormalContainer>
      <Header title="일정 조율" />
      <ResultNavbar />
      <ResultInfoComp
        decidedTime={formatResultTime(dateTimes)}
        title="류세영의 방"
        participants={data.participatedPersonnel}
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
      <ButtonContainer>
        <Button $style="solid" onClick={handleClick}>
          공유하기
        </Button>
      </ButtonContainer>
      {isOpen && <UrlShareModal handleModalClose={closeModal} />}
    </NormalContainer>
  );
}

export default ResultPage;
