import { BottomSheetContainer } from '@/styles/components/bottomsheet/bottomsheet';
import styled from 'styled-components';
import { useTimeModal } from '@/store/useModalStore';
import React, { useState } from 'react';
import { useEndTimeStore, useStartTimeStore } from '@/store/useTimeStore';
import { SetTime } from '@/types/SetTime';
import BottomSheetHeader from './BottomSheetHeader';
import Button from '../common/Button';

interface Props {
  type: SetTime;
}

function TimePicker({ type }: Props) {
  const [selectedAmPm, setSelectedAmPm] = useState<string>();
  const [selectedHour, setSelectedHour] = useState<string>();
  const [selectedMin, setSelectedMin] = useState<string>();

  const updateStartTime = useStartTimeStore((state) => state.updateTime);
  const updateEndTime = useEndTimeStore((state) => state.updateTime);
  const closeTime = useTimeModal((state) => state.close);

  const handleClickButton = () => {
    const updatedTime = `${selectedAmPm} ${selectedHour}:${selectedMin}`;
    if (type === 'start') updateStartTime(updatedTime);
    if (type === 'end') updateEndTime(updatedTime);
    closeTime();
  };

  const handleClickAmPm = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedAmPm(event.currentTarget.innerText);
  };

  const handleClickHour = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedHour(event.currentTarget.innerText);
  };

  const handleClickMin = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedMin(event.currentTarget.innerText);
  };

  return (
    <Container>
      <BottomSheetHeader title="시간 선택" onClick={closeTime} />
      <TimePickerContainer>
        <AmPmWrapper>
          <TimePickerButton
            onClick={handleClickAmPm}
            $active={selectedAmPm === '오전'}
          >
            오전
          </TimePickerButton>
          <TimePickerButton
            onClick={handleClickAmPm}
            $active={selectedAmPm === '오후'}
          >
            오후
          </TimePickerButton>
        </AmPmWrapper>
        <ContentWrapper>
          <Label>시간대</Label>
          <HourWrapper>
            {Array.from({ length: 12 }, (_, index) => (
              <TimePickerButton
                onClick={handleClickHour}
                key={index}
                $active={selectedHour === String(index + 1)}
              >
                {index + 1}
              </TimePickerButton>
            ))}
          </HourWrapper>
        </ContentWrapper>
        <ContentWrapper>
          <Label>분 단위</Label>
          <MinuteWrapper>
            {['00', '30'].map((item) => (
              <TimePickerButton
                key={item}
                onClick={handleClickMin}
                $active={selectedMin === item}
              >
                {item}
              </TimePickerButton>
            ))}
          </MinuteWrapper>
        </ContentWrapper>
      </TimePickerContainer>
      <ButtonContainer>
        <Button
          $style="solid"
          $theme="primary-purple"
          disabled={!selectedHour || !selectedMin}
          onClick={handleClickButton}
        >
          완료
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled(BottomSheetContainer)`
  height: 80%;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 16px;
  width: 100%;
  padding: 0 24px;
`;

const TimePickerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const AmPmWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
`;
const Label = styled.h2`
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
  ${({ theme }) => theme.typo.body.medium[18]};
`;

const HourWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 4px;
`;

const MinuteWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
`;

const TimePickerButton = styled.button<{ $active: boolean }>`
  width: 100%;
  text-align: center;
  padding: 16px 0;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.color.point.green : theme.color.secondary.solid.bk[300]};
  color: ${({ theme, $active }) =>
    $active ? theme.color.point.green : theme.color.secondary.solid.bk[600]};
  ${({ theme }) => theme.typo.body.medium[16]}

  &:hover {
    color: ${({ theme }) => theme.color.point.green};
    border: 1px solid ${({ theme }) => theme.color.point.green};
  }
`;

export default TimePicker;
