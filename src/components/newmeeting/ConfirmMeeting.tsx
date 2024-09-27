import { TITLE } from '@/constants/title';
import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import { PageTitle } from '@/styles/components/text';
import HEAD_TITLE from '@/constants/header';
import Header from '@/components/common/Header';
import styled, { useTheme } from 'styled-components';
import { RightArrowIcon } from 'public/assets/icons';
import { Content, MeetingData } from '@/types/meeting';
import { useQuitMakeMeetingModal } from '@/store/useModalStore';
import ProgressBar from './ProgressBar';
import Button from '../common/Button';

interface Props {
  meetingData: MeetingData;
  setContent: (value: Content) => void;
}

function ConfirmMeeting({ meetingData, setContent }: Props) {
  const theme = useTheme();
  const openQuit = useQuitMakeMeetingModal((state) => state.open);

  const {
    name: { value },
    times: { startTime, endTime },
    dates,
  } = meetingData;

  const handleClickPrev = () => {
    setContent('make');
  };

  return (
    <FlexColContainer>
      <Header title={HEAD_TITLE.newMeeting} isClose onIconClick={openQuit} />
      <ContentContainer>
        <PageTitle>{TITLE.confirmMeeting}</PageTitle>
        <ProgressBar currentStep="confirm" />
        <ConfirmContentsContainer>
          <Title>새 일정 정보</Title>
          <ContentWrapper>
            <ContentTitle>일정명</ContentTitle>
            <ContentDetail>{value}</ContentDetail>
          </ContentWrapper>
          <ContentWrapper>
            <ContentTitle>지정한 일시</ContentTitle>
            <DateWrapper>
              <ContentDetail>시작일 : {dates[0]}</ContentDetail>
              <ContentDetail>종료일 : {dates[1]}</ContentDetail>
            </DateWrapper>
          </ContentWrapper>
          <ContentWrapper>
            <ContentTitle>가능한 시간</ContentTitle>
            <ContentDetail>
              {startTime} 이후 ~ {endTime} 이전
            </ContentDetail>
          </ContentWrapper>
        </ConfirmContentsContainer>
      </ContentContainer>
      <ButtonContainer>
        <ButtonWrapper>
          <PrevButton
            $style="outlined"
            $theme="neutral"
            onClick={handleClickPrev}
          >
            이전
          </PrevButton>
          <Button
            $style="solid"
            $theme="primary-purple"
            onClick={() => setContent('login')}
          >
            일정 생성
          </Button>
        </ButtonWrapper>
        <EditButton onClick={handleClickPrev}>
          수정하기{' '}
          <RightArrowIcon
            width={20}
            height={20}
            fill={theme.color.secondary.solid.bk[800]}
          />
        </EditButton>
      </ButtonContainer>
    </FlexColContainer>
  );
}

const ConfirmContentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
  ${({ theme }) => theme.typo.body.semi_bold[18]}
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const ContentTitle = styled.h3`
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
  ${({ theme }) => theme.typo.body.medium[16]}
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentDetail = styled.h3`
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
  ${({ theme }) => theme.typo.body.semi_bold}
`;

const ButtonContainer = styled.div`
  position: sticky;
  bottom: 16px;
  width: 100%;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const PrevButton = styled(Button)`
  background: none;
  border: 1px solid ${({ theme }) => theme.color.secondary.solid.bk[800]};
  color: ${({ theme }) => theme.color.secondary.solid.bk[800]};
`;

const EditButton = styled.button`
  width: 100%;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: none;
  color: ${({ theme }) => theme.color.secondary.solid.bk[800]};
  ${({ theme }) => theme.typo.heading.bold[16]}
`;

export default ConfirmMeeting;
