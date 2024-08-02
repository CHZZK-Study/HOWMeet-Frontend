import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import RoomInput from '@/components/room/RoomInput';
import SelectDate from '@/components/room/SelectDate';
import SelectTime from '@/components/room/SelectTime';
import HEAD_TITLE from '@/constants/header';
import INPUT from '@/constants/input';
import { TITLE } from '@/constants/title';
import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import { PageTitle } from '@/styles/components/text';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

function NewMeetingPage() {
  // TODO 소셜 로그인 유무에 따른 PageTitle 변경 및 버튼 변경
  const methods = useForm({ mode: 'onChange' });
  const {
    register,
    formState: { isValid },
  } = methods;

  return (
    <FlexColContainer>
      <Header title={HEAD_TITLE.newMeeting} />
      <ContentContainer>
        <PageTitle>{TITLE.newMeeting}</PageTitle>
        <RoomInput
          placeholder={INPUT.newMeeting.placeholder}
          label={INPUT.newMeeting.label}
          {...register('newMeeting', {
            required: true,
            minLength: 1,
          })}
        />
        <SelectDate />
        <SelectTime />
      </ContentContainer>
      <ButtonContainer>
        {isValid ? (
          <Button $style="solid">완료</Button>
        ) : (
          <Button $style="outlined">건너 뛰기</Button>
        )}
      </ButtonContainer>
    </FlexColContainer>
  );
}

const ButtonContainer = styled.div`
  position: sticky;
  bottom: 16px;
  width: 100%;
  padding: 0 24px;
`;

export default NewMeetingPage;
