import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import AttendStatusHeader from '@/components/meeting/result/AttendStatusHeader';
import ResultHeatmap from '@/components/meeting/result/ResultHeatmap';
import {
  ButtonContainer,
  NormalContainer,
} from '@/styles/components/container';
import { ResultHeatmapProps } from '@/types/ResultHeatmap';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

function ResultPage() {
  const timeTableData = {
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

  const { isPending, error, data } = useQuery({
    queryKey: ['selectedTimeData'],
    queryFn: () => fetch('/selectedResult').then((res) => res.json()),
  });

  const selectedTimeSlots = data as ResultHeatmapProps;
  console.log(isPending, error, data);

  const [isDragged, setisDragged] = useState<boolean>(true);
  return (
    <NormalContainer>
      <Header title="일정 조율" />
      <AttendStatusHeader
        TotalParticipants={selectedTimeSlots.totalParticipants.names.length}
        currentParticipants={selectedTimeSlots.participatedUsers.names.length}
        participatedUsers={selectedTimeSlots.participatedUsers.names}
        unParticipatedUsers={selectedTimeSlots.totalParticipants.names.filter(
          (name) => !selectedTimeSlots.participatedUsers.names.includes(name)
        )}
      />
      <ResultHeatmap data={timeTableData} roomInfo={selectedTimeSlots} />

      <ButtonContainer>
        <Button $style="solid" disabled={isDragged}>
          {isDragged ? '드래그로 시간 확정하기' : '일정 확정하기'}
        </Button>
      </ButtonContainer>
    </NormalContainer>
  );
}

export default ResultPage;
