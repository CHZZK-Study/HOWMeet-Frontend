import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import Header from '@/components/common/Header';
import HEAD_TITLE from '@/constants/header';
import { PageTitle } from '@/styles/components/text';
import { TITLE } from '@/constants/title';
import ProgressBar from './ProgressBar';
import LoginForm from '../login/LoginForm';

function LoginNonMember() {
  return (
    <FlexColContainer>
      <Header title={HEAD_TITLE.newMeeting} />
      <ContentContainer>
        <PageTitle>{TITLE.nonMemberInfo}</PageTitle>
        <ProgressBar currentStep="login" />
        <LoginForm />
      </ContentContainer>
    </FlexColContainer>
  );
}

export default LoginNonMember;
