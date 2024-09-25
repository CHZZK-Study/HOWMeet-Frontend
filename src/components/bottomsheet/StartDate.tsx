import { Badge } from '@/styles/components/badge';
import styled from 'styled-components';
import { useState } from 'react';
import moment from 'moment';
import { useStartDateModal } from '@/store/useModalStore';
import { useStartDateStore } from '@/store/useDateStore';
import {
  BottomSheetContainer,
  BottomSheetInfoWrapper,
  BottomSheetInfo,
} from '@/styles/components/bottomsheet/bottomsheet';
import Button from '../common/Button';
import Calendar from './Calendar';
import BottomSheetHeader from './BottomSheetHeader';

function StartDate() {
  const [startDate, setStartDate] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  );

  const closeStartDate = useStartDateModal((state) => state.close);
  const updateStartDate = useStartDateStore((state) => state.updateDate);

  const handleClickButton = () => {
    updateStartDate(startDate);
    closeStartDate();
  };

  return (
    <BottomSheetContainer>
      <BottomSheetHeader title="시작일 선택" onClick={closeStartDate} />
      <BottomSheetInfoWrapper>
        <Badge>시작일</Badge>
        <BottomSheetInfo>{startDate}</BottomSheetInfo>
      </BottomSheetInfoWrapper>
      <Calendar onChange={setStartDate} />
      <ButtonContainer>
        <Button
          $style="solid"
          $theme="primary-purple"
          onClick={handleClickButton}
        >
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

export default StartDate;
