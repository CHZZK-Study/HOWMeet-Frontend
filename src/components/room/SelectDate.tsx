import ICONS from '@/constants/icons';
import { SUB_TITLE } from '@/constants/title';
import { useEndDateStore, useStartDateStore } from '@/store/useDateStore';
import { useEndDateModal, useStartDateModal } from '@/store/useModalStore';
import { Badge } from '@/styles/components/badge';
import {
  SelectableItem,
  SelectContainer,
  SelectWrapper,
} from '@/styles/components/meeting/select';
import { SubTitle } from '@/styles/components/text';
import styled from 'styled-components';

function SelectDate() {
  const openStartDate = useStartDateModal((state) => state.open);
  const openEndDate = useEndDateModal((state) => state.open);
  const startDate = useStartDateStore((state) => state.date);
  const endDate = useEndDateStore((state) => state.date);

  return (
    <SelectContainer>
      <SubTitle>{SUB_TITLE.date}</SubTitle>
      <SelectWrapper>
        <SelectableItem onClick={openStartDate}>
          <DateWrapper>
            <Badge>시작일</Badge>
            <Date>{startDate}</Date>
          </DateWrapper>
          <img src={ICONS.common.right} alt="right" />
        </SelectableItem>
        <SelectableItem onClick={openEndDate}>
          <DateWrapper>
            <Badge>종료일</Badge>
            <Date>{endDate}</Date>
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
