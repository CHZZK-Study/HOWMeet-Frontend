import ICONS from '@/constants/icons';
import { SUB_TITLE } from '@/constants/title';
import { Badge } from '@/styles/components/badge';
import {
  SelectableItem,
  SelectContainer,
  SelectWrapper,
} from '@/styles/components/meeting/select';
import { SubTitle } from '@/styles/components/text';
import styled from 'styled-components';

function SelectDate() {
  return (
    <SelectContainer>
      <SubTitle>{SUB_TITLE.date}</SubTitle>
      <SelectWrapper>
        <SelectableItem>
          <DateWrapper>
            <Badge>시작일</Badge>
            <Date>2024. 07. 11</Date>
          </DateWrapper>
          <img src={ICONS.common.right} alt="right" />
        </SelectableItem>
        <SelectableItem>
          <DateWrapper>
            <Badge>종료일</Badge>
            <Date>2024. 07. 11</Date>
          </DateWrapper>
          <img src={ICONS.common.right} alt="right" />
        </SelectableItem>
      </SelectWrapper>
    </SelectContainer>
  );
}

const DateWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Date = styled.div`
  color: ${({ theme }) => theme.color.secondary.solid.bk[700]};
  ${({ theme }) => theme.typo.body.medium[14]};
  letter-spacing: -0.14px;
`;

export default SelectDate;
