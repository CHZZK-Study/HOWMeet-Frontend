import { LABEL } from '@/constants/label';
import {
  ContentWrapper,
  ContentTitle,
  ContentDescription,
} from '@/styles/components/meeting/content';
import styled from 'styled-components';

interface Props {
  contents: {
    roomName?: string;
    req: {
      roomName: string;
      name: { value: string };
      dates: string[];
      time: {
        startTime: string;
        endTime: string;
      };
    };
  };
}

function ConfirmContent({ contents }: Props) {
  return (
    <>
      <ContentWrapper>
        <ContentTitle>{LABEL.roomName}</ContentTitle>
        <ContentDescription>
          {contents.req ? contents.req.roomName : contents.roomName}
        </ContentDescription>
      </ContentWrapper>
      {contents.req && (
        <>
          <ContentWrapper>
            <ContentTitle>{LABEL.meeting}</ContentTitle>
            <ContentDescription>{contents.req.name.value}</ContentDescription>
          </ContentWrapper>
          <ContentWrapper>
            <ContentTitle>{LABEL.setDate}</ContentTitle>
            <SettingTimeWrapper>
              <ContentDescription>
                시작일 : {contents.req.dates[0]}
              </ContentDescription>
              <ContentDescription>
                종료일 : {contents.req.dates[1]}
              </ContentDescription>
            </SettingTimeWrapper>
          </ContentWrapper>
        </>
      )}
      {contents.req && (
        <ContentWrapper>
          <ContentTitle>{LABEL.setTime}</ContentTitle>
          <ContentDescription>
            {contents.req.time.startTime} 이후 ~ {contents.req.time.endTime}{' '}
            이전
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
