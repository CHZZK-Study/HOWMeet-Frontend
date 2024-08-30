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
import { formatResultTime } from '@/utils/meeting/timetable/formatDateTime';
import { useQuery } from '@tanstack/react-query';

function ResultPage() {
  const { isOpen, closeModal, openModal } = useModal();

  const timeTableData: TimeTableData = {
    hours: [
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
    ],
    days: ['월', '화', '수', '목', '금', '토', '일'],
    dates: [
      '2024-07-01',
      '2024-07-02',
      '2024-07-03',
      '2024-07-04',
      '2024-07-05',
      '2024-07-06',
      '2024-07-07',
    ],
    months: ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6', '7/7'],
    isEndHalfMinute: false,
    isStartHalfMinute: false,
  };

  const { isPending, error, data } = useQuery<ResultHeatmapProps>({
    queryKey: ['selectedTimeData'],
    queryFn: () => fetch('/selectedResult').then((res) => res.json()),
  });

  if (isPending) return <div>로딩중...</div>;
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

  const participant = [
    '구예진',
    '경효선',
    '김유희',
    '류지민',
    '권오영',
    '고세종',
    '김민우',
    '이수현',
    '이채림',
  ];

  return (
    <NormalContainer>
      <Header title="일정 조율" />
      <ResultNavbar />
      <ResultInfoComp
        decidedTime={formatResultTime(dateTimes)}
        title="류세영의 방"
        participants={participant}
      />
      <BackLayout>
        <Container>
          <ResultTimeTable roomInfo={data} data={timeTableData} dragDisabled />
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
