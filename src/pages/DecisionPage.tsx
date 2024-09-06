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
  formatTimeTableData,
} from '@/utils/meeting/timetable/formatDateTime';
import AttendStatusHeader from '@/components/meeting/result/AttendStatusHeader';
import useModal from '@/hooks/useModal';
import ResultTimeSelectModal from '@/components/meeting/result/ResultTimeSelectModal';
import { useNavigate, useParams } from 'react-router-dom';

function DecisionPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const timeTableData = formatTimeTableData([
    '2024-07-01T10:30',
    '2024-07-07T22:30',
  ]);

  const [isSelected, setIsSelected] = useState(false);
  const { isOpen, closeModal, openModal } = useModal();
  const { selectedResult } = useTimeStore();

  const { isLoading, error, data } = useQuery<ResultHeatmapProps>({
    queryKey: ['selectedTimeData'],
    queryFn: () => fetch('/selectedResult').then((res) => res.json()),
  });

  if (isLoading)
    return (
      <NormalContainer>
        <Header title="일정 조율" />
      </NormalContainer>
    );
  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return <div>데이터가 없습니다</div>;

  const handleDecide = () => {
    setIsSelected(true);
    navigate(`/meeting/${id}/result`);
    console.log('selectedResult: ', formatPostDateTime(selectedResult));
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
