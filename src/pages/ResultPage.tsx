import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import ResultTimeTable from '@/components/meeting/result/ResultTimeTable';
import { ResultHeatmapProps, TimeTableData } from '@/types/timeTableTypes';
import {
  ButtonContainer,
  NormalContainer,
} from '@/styles/components/container';
import { useTimeStore } from '@/store/meeting/useTimeStore';
import { formatPostDateTime } from '@/utils/meeting/timetable/formatDateTime';
import ResultTimeSeleModal from '@/components/meeting/result/ResultTimeSeleModal';
import AttendStatusHeader from '@/components/meeting/result/AttendStatusHeader';
import useModal from '@/hooks/useModal';

function ResultPage() {
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
  };

  const [isSelected, setIsSelected] = useState(false);
  const { isOpen, closeModal, openModal } = useModal();
  const { selectedResult } = useTimeStore();

  const { isPending, error, data } = useQuery<ResultHeatmapProps>({
    queryKey: ['selectedTimeData'],
    queryFn: () => fetch('/selectedResult').then((res) => res.json()),
  });

  if (isPending) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return <div>데이터가 없습니다</div>;

  const handleDecide = () => {
    openModal();
    setIsSelected(true);
    console.log('selectedResult: ', formatPostDateTime(selectedResult));
  };

  return (
    <NormalContainer>
      <Header title="일정 조율" />
      <AttendStatusHeader
        TotalParticipants={data.totalParticipants.names.length}
        currentParticipants={data.participatedUsers.names.length}
        participatedUsers={data.participatedUsers.names}
        unParticipatedUsers={data.totalParticipants.names.filter(
          (name) => !data.participatedUsers.names.includes(name)
        )}
      />
      <ResultTimeTable
        data={timeTableData}
        roomInfo={data}
        dragDisabled={isSelected}
      />
      <ButtonContainer>
        <Button
          $style="solid"
          onClick={handleDecide}
          disabled={selectedResult.length === 0}
        >
          {selectedResult.length === 0
            ? '드래그로 시간 확정하기'
            : '일정 확정하기'}
        </Button>
      </ButtonContainer>
      {isOpen ? (
        <ResultTimeSeleModal
          handleModalClose={closeModal}
          decidedTime={selectedResult}
        />
      ) : null}
    </NormalContainer>
  );
}

export default ResultPage;
