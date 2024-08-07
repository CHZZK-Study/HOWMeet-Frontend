import { Badge } from '@/styles/components/badge';
import styled from 'styled-components';
import CloseIcon from 'public/assets/icons/common/close.svg';
import { useState } from 'react';
import moment from 'moment';
import { useStartDateModal } from '@/store/useModalStore';
import { useStartDateStore } from '@/store/useDateStore';
import {
  BottomSheetContainer,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetInfoWrapper,
  BottomSheetInfo,
} from '@/styles/components/bottomsheet/bottomsheet';
import Button from '../common/Button';
import Calendar from './Calendar';

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
      <BottomSheetHeader>
        <BottomSheetTitle>시작일 선택</BottomSheetTitle>
        <button type="button" onClick={closeStartDate}>
          <img src={CloseIcon} alt="close" />
        </button>
      </BottomSheetHeader>
      <BottomSheetInfoWrapper>
        <Badge>시작일</Badge>
        <BottomSheetInfo>{startDate}</BottomSheetInfo>
      </BottomSheetInfoWrapper>
      <Calendar onChange={setStartDate} />
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

export default StartDate;
