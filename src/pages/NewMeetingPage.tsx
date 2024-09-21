import EndDate from '@/components/bottomsheet/EndDate';
import StartDate from '@/components/bottomsheet/StartDate';
import TimePicker from '@/components/bottomsheet/TimePicker';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import Modal from '@/components/common/Modal';
import RoomInput from '@/components/room/RoomInput';
import SelectDate from '@/components/room/SelectDate';
import SelectTime from '@/components/room/SelectTime';
import HEAD_TITLE from '@/constants/header';
import INPUT from '@/constants/input';
import { TITLE } from '@/constants/title';
import {
  useEndDateModal,
  useStartDateModal,
  useTimeModal,
} from '@/store/useModalStore';
import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import { PageTitle } from '@/styles/components/text';
import { SetTime } from '@/types/SetTime';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';

function NewMeetingPage() {
  const [timeType, setTimeType] = useState<SetTime>('start');
  // TODO 소셜 로그인 유무에 따른 PageTitle 변경 및 버튼 변경
  const { isOpen: isStartDateOpen, close: closeStartDate } =
    useStartDateModal();
  const { isOpen: isEndDateOpen, close: closeEndDate } = useEndDateModal();
  const {
    isOpen: isTimeOpen,
    open: openTime,
    close: closeTime,
  } = useTimeModal();

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      newMeeting: '',
    },
  });
  const {
    register,
    formState: { isValid },
  } = methods;

  const handleSetType = (type: SetTime) => {
    setTimeType(type);
    openTime();
  };

  return (
    <FlexColContainer>
      <Header title={HEAD_TITLE.newMeeting} />
      <ContentContainer>
        <PageTitle>{TITLE.newMeeting}</PageTitle>
        <FormProvider {...methods}>
          <RoomInput
            placeholder={INPUT.newMeeting.placeholder}
            label={INPUT.newMeeting.label}
            {...register('newMeeting', {
              required: true,
              minLength: 1,
            })}
          />
        </FormProvider>
        <SelectDate />
        <SelectTime onClick={handleSetType} />
      </ContentContainer>
      <ButtonContainer>
        {isValid ? (
          <Button $style="solid" $theme="primary-purple">
            완료
          </Button>
        ) : (
          <Button $style="outlined" $theme="primary-purple">
            건너 뛰기
          </Button>
        )}
      </ButtonContainer>
      {isStartDateOpen && (
        <Modal onClose={closeStartDate}>
          <StartDate />
        </Modal>
      )}
      {isEndDateOpen && (
        <Modal onClose={closeEndDate}>
          <EndDate />
        </Modal>
      )}
      {isTimeOpen && (
        <Modal onClose={closeTime}>
          <TimePicker type={timeType} />
        </Modal>
      )}
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
