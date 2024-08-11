import { BottomSheetContainer } from '@/styles/components/bottomsheet/bottomsheet';
import styled from 'styled-components';
import { useTimeModal } from '@/store/useModalStore';
import { useEffect, useRef, useState } from 'react';
import { useEndTimeStore, useStartTimeStore } from '@/store/useTimeStore';
import { SetTime } from '@/types/SetTime';
import BottomSheetHeader from './BottomSheetHeader';
import Button from '../common/Button';

interface Props {
  type: SetTime;
}

function TimePicker({ type }: Props) {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMin, setSelectedMin] = useState('');
  const [hours, setHours] = useState<string[]>(
    Array.from({ length: 24 }, (_, index) => String(index))
  );

  const hourListRef = useRef<HTMLUListElement>(null);
  const updateStartTime = useStartTimeStore((state) => state.updateTime);
  const updateEndTime = useEndTimeStore((state) => state.updateTime);
  const closeTime = useTimeModal((state) => state.close);

  const handleClickButton = () => {
    const updatedTime = `${selectedHour}:${selectedMin}`;
    if (type === 'start') updateStartTime(updatedTime);
    if (type === 'end') updateEndTime(updatedTime);
    closeTime();
  };

  useEffect(() => {
    const hourList = hourListRef.current;

    if (hourList) {
      hourList.addEventListener('scroll', (event) => {
        const target = event.target as HTMLUListElement;
        const maxScrollHeight = target.scrollHeight - target.clientHeight;

        if (hourList.scrollTop === maxScrollHeight) {
          setHours((prev) => [...prev, ...hours]);
        }
      });
    }
    return undefined;
  }, [hours]);

  return (
    <Container>
      <BottomSheetHeader title="시간 선택" onClick={closeTime} />
      <TimePickerContainer>
        <SelectHour ref={hourListRef}>
          {hours.map((item, index) => (
            <SelectItem key={item + index} $isSelected={item === selectedHour}>
              <button type="button" onClick={() => setSelectedHour(item)}>
                {item}
              </button>
            </SelectItem>
          ))}
        </SelectHour>
        <SelectMinute>
          {['00', '30'].map((item) => (
            <SelectItem $isSelected={item === selectedMin}>
              <button type="button" onClick={() => setSelectedMin(item)}>
                {item}
              </button>
            </SelectItem>
          ))}
        </SelectMinute>
      </TimePickerContainer>
      <ButtonContainer>
        <Button
          $style="solid"
          disabled={selectedHour === '' || selectedMin === ''}
          onClick={handleClickButton}
        >
          완료
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled(BottomSheetContainer)`
  height: 50%;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 16px;
  width: 100%;
  padding: 0 24px;
`;

const TimePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 160px;
  height: 180px;
`;

const SelectHour = styled.ul`
  height: 100%;
  overflow: scroll;
`;

const SelectItem = styled.li<{ $isSelected: boolean }>`
  padding: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 6px;

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.secondary.solid.bk[50]};
  }

  button {
    width: 100%;
    height: 100%;

    ${({ theme }) => theme.typo.body.regular[22]}

    ${({ theme, $isSelected }) => {
      if ($isSelected) return `color: ${theme.color.point.purple}`;
      return `color: ${theme.color.secondary.solid.bk[400]}`;
    }}
  }
`;

const SelectMinute = styled.ul`
  color: ${({ theme }) => theme.color.secondary.solid.bk[400]};
  ${({ theme }) => theme.typo.body.regular[22]}
`;

export default TimePicker;
