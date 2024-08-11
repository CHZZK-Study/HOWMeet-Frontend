import { Badge } from '@/styles/components/badge';
import styled from 'styled-components';
import { useState } from 'react';
import moment from 'moment';
import { useEndDateModal } from '@/store/useModalStore';
import { useEndDateStore, useStartDateStore } from '@/store/useDateStore';
import calculateDate from '@/utils/calculateDate';
import {
  BottomSheetContainer,
  BottomSheetInfoWrapper,
  BottomSheetInfo,
} from '@/styles/components/bottomsheet/bottomsheet';
import Button from '../common/Button';
import Calendar from './Calendar';
import BottomSheetHeader from './BottomSheetHeader';

function EndDate() {
  const [endDate, setEndDate] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  );
  const [isOver, setIsOver] = useState(false);
  const startDate = useStartDateStore((state) => state.date);
  const updateEndDate = useEndDateStore((state) => state.updateDate);
  const closeEndDate = useEndDateModal((state) => state.close);

  const handleChangeCalendar = (date: string) => {
    const differ = calculateDate(startDate, date);

    if (differ > 7) {
      setIsOver(true);
      return;
    }
    setIsOver(false);
    setEndDate(date);
  };

  const handleClickButton = () => {
    if (isOver) return;
    updateEndDate(endDate);
    closeEndDate();
  };

  return (
    <BottomSheetContainer>
      <BottomSheetHeader title="종료일 선택" onClick={closeEndDate} />
      <BottomSheetInfoWrapper>
        <Badge>종료일</Badge>
        <BottomSheetInfo>{endDate}</BottomSheetInfo>
      </BottomSheetInfoWrapper>
      <Calendar onChange={handleChangeCalendar} $isOver={isOver} />
      <ButtonContainer>
        <Button $style="solid" onClick={handleClickButton}>
          완료
        </Button>
      </ButtonContainer>
    </BottomSheetContainer>
  );
}

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 16px;
  width: 100%;
  padding: 0 24px;
`;

export default EndDate;
