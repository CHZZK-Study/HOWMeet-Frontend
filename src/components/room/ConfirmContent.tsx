import { LABEL } from '@/constants/label';
import {
  ContentWrapper,
  ContentTitle,
  ContentDescription,
} from '@/styles/components/meeting/content';
import styled from 'styled-components';

interface Props {
  contents: {
    req?: {
      leaderMemberId: number;
      msRequest: {
        dates: string[];
        name: { value: string };
        time: { startTime: string; endTime: string };
      };
      name: string;
    };
    roomName?: string;
  };
}

function ConfirmContent({ contents }: Props) {
  // TODO 로그인 유무에 따른 "방이름" 컨텐츠 제거
  return (
    <>
      <ContentWrapper>
        <ContentTitle>{LABEL.roomName}</ContentTitle>
        <ContentDescription>
          {contents.req ? contents.req.name : contents.roomName}
        </ContentDescription>
      </ContentWrapper>
      {contents.req && (
        <>
          <ContentWrapper>
            <ContentTitle>{LABEL.meeting}</ContentTitle>
            <ContentDescription>킥오프 일정</ContentDescription>
          </ContentWrapper>
          <ContentWrapper>
            <ContentTitle>{LABEL.setDate}</ContentTitle>
            <SettingTimeWrapper>
              <ContentDescription>
                시작일 : {contents.req.msRequest.dates[0]}
              </ContentDescription>
              <ContentDescription>
                종료일 : {contents.req.msRequest.dates[1]}
              </ContentDescription>
            </SettingTimeWrapper>
          </ContentWrapper>
        </>
      )}
      {contents.req && (
        <ContentWrapper>
          <ContentTitle>{LABEL.setTime}</ContentTitle>
          <ContentDescription>
            {contents.req.msRequest.time.startTime} 이후 ~{' '}
            {contents.req.msRequest.time.endTime} 이전
          </ContentDescription>
        </ContentWrapper>
      )}
    </>
  );
}

const SettingTimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ConfirmContent;
