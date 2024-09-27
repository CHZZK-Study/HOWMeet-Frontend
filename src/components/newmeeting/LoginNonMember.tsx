import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import Header from '@/components/common/Header';
import HEAD_TITLE from '@/constants/header';
import { PageTitle } from '@/styles/components/text';
import { TITLE } from '@/constants/title';
import { useQuitMakeMeetingModal } from '@/store/useModalStore';
import useNonMemberMeetingStore from '@/store/meeting/useNonMemberMeeting';
import ProgressBar from './ProgressBar';
import LoginForm from '../login/LoginForm';

function LoginNonMember() {
  const openQuit = useQuitMakeMeetingModal((state) => state.open);
  const meetingId = useNonMemberMeetingStore((state) => state.meetingId);

  return (
    <FlexColContainer>
      <Header title={HEAD_TITLE.newMeeting} isClose onIconClick={openQuit} />
      <ContentContainer>
        <PageTitle>{TITLE.nonMemberInfo}</PageTitle>
        <ProgressBar currentStep="login" />
        <LoginForm meetingId={meetingId} />
      </ContentContainer>
    </FlexColContainer>
  );
}

export default LoginNonMember;
