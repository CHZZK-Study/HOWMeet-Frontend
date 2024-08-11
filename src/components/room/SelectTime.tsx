import ICONS from '@/constants/icons';
import { SUB_TITLE } from '@/constants/title';
import { useEndTimeStore, useStartTimeStore } from '@/store/useTimeStore';
import { Badge } from '@/styles/components/badge';
import {
  SelectContainer,
  SelectWrapper,
  SelectableItem,
} from '@/styles/components/meeting/select';
import { SubTitle } from '@/styles/components/text';
import { SetTime } from '@/types/SetTime';
import styled from 'styled-components';

interface Props {
  onClick: (value: SetTime) => void;
}

function SelectTime({ onClick }: Props) {
  const startTime = useStartTimeStore((state) => state.time);
  const endTime = useEndTimeStore((state) => state.time);

  return (
    <SelectContainer>
      <SubTitle>{SUB_TITLE.time}</SubTitle>
      <SelectWrapper $horizontal>
        <SelectableItem onClick={() => onClick('start')}>
          <TimeWrapper>
            <Time>{startTime}</Time>
            <Badge>이후</Badge>
          </TimeWrapper>
          <img src={ICONS.common.right} alt="right" />
        </SelectableItem>
        <SelectableItem onClick={() => onClick('end')}>
          <TimeWrapper>
            <Time>{endTime}</Time>
            <Badge>이전</Badge>
          </TimeWrapper>
          <img src={ICONS.common.right} alt="right" />
        </SelectableItem>
      </SelectWrapper>
    </SelectContainer>
  );
}

const TimeWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const Time = styled.div`
  color: ${({ theme }) => theme.color.secondary.solid.bk[700]};
  ${({ theme }) => theme.typo.body.medium[14]};
  letter-spacing: -0.14px;
`;

export default SelectTime;
