import { LABEL } from '@/constants/label';
import {
  ContentWrapper,
  ContentTitle,
  ContentDescription,
} from '@/styles/components/meeting/content';
import styled from 'styled-components';

function ConfirmContent() {
  return (
    <>
      <ContentWrapper>
        <ContentTitle>{LABEL.roomName}</ContentTitle>
        <ContentDescription>하우밋</ContentDescription>
      </ContentWrapper>
      <ContentWrapper>
        <ContentTitle>{LABEL.meeting}</ContentTitle>
        <ContentDescription>킥오프 일정</ContentDescription>
      </ContentWrapper>
      <ContentWrapper>
        <ContentTitle>{LABEL.setDate}</ContentTitle>
        <SettingTimeWrapper>
          <ContentDescription>시작일 : 2024. 07. 11</ContentDescription>
          <ContentDescription>종료일 : 2024. 07. 11</ContentDescription>
        </SettingTimeWrapper>
      </ContentWrapper>
      <ContentWrapper>
        <ContentTitle>{LABEL.setTime}</ContentTitle>
        <ContentDescription>10:00 이후 ~ 23:00 이전</ContentDescription>
      </ContentWrapper>
    </>
  );
}

const SettingTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ConfirmContent;
