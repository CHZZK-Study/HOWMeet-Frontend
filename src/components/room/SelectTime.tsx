import ICONS from '@/constants/icons';
import { SUB_TITLE } from '@/constants/title';
import { Badge } from '@/styles/components/badge';
import {
  SelectContainer,
  SelectWrapper,
  SelectableItem,
} from '@/styles/components/meeting/select';
import { SubTitle } from '@/styles/components/text';
import styled from 'styled-components';

function SelectTime() {
  return (
    <SelectContainer>
      <SubTitle>{SUB_TITLE.time}</SubTitle>
      <SelectWrapper horizontal>
        <SelectableItem>
          <TimeWrapper>
            <Time>0:00</Time>
            <Badge>이후</Badge>
          </TimeWrapper>
          <img src={ICONS.common.right} alt="right" />
        </SelectableItem>
        <SelectableItem>
          <TimeWrapper>
            <Time>0:00</Time>
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
