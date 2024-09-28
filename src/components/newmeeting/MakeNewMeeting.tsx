import EndDate from '@/components/bottomsheet/EndDate';
import StartDate from '@/components/bottomsheet/StartDate';
import TimePicker from '@/components/bottomsheet/TimePicker';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import Modal from '@/components/common/Modal';
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
import styled from 'styled-components';
import { useEndDateStore, useStartDateStore } from '@/store/useDateStore';
import { useEndTimeStore, useStartTimeStore } from '@/store/useTimeStore';
import { DeleteAllIcon } from 'public/assets/icons';
import useMeetingStore from '@/store/useMeetingStore';
import { Content, MeetingData } from '@/types/meeting';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/path';
import ProgressBar from './ProgressBar';

interface Props {
  setContent: (value: Content) => void;
  setMeetingData: (value: MeetingData) => void;
}

function MakeNewMeeting({ setContent, setMeetingData }: Props) {
  const [timeType, setTimeType] = useState<SetTime>('start');
  const navigate = useNavigate();

  const { isOpen: isStartDateOpen, close: closeStartDate } =
    useStartDateModal();
  const { isOpen: isEndDateOpen, close: closeEndDate } = useEndDateModal();

  const { title, setTitle } = useMeetingStore();
  const startDate = useStartDateStore((state) => state.date);
  const endDate = useEndDateStore((state) => state.date);
  const startTime = useStartTimeStore((state) => state.time);
  const endTime = useEndTimeStore((state) => state.time);

  const {
    isOpen: isTimeOpen,
    open: openTime,
    close: closeTime,
  } = useTimeModal();

  const handleSetType = (type: SetTime) => {
    setTimeType(type);
    openTime();
  };

  const handleOnSubmit = () => {
    const meetingData = {
      name: { value: title },
      dates: [startDate, endDate],
      times: { startTime, endTime },
    };

    setMeetingData(meetingData);
    setContent('confirm');
  };

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDeleteAll = () => setTitle('');

  return (
    <FlexColContainer>
      <Header
        title={HEAD_TITLE.newMeeting}
        onLeftArrowIconClick={() => navigate(PATH.login)}
      />
      <ContentContainer>
        <PageTitle>{TITLE.newMeetingNonMember}</PageTitle>
        <ProgressBar currentStep="making" />
        <Label>{INPUT.newMeeting.label}</Label>
        <InputWrapper>
          <Input
            placeholder={INPUT.newMeeting.placeholder}
            value={title}
            onChange={handleOnChangeInput}
          />
          {title.length > 0 && (
            <button
              className="delete-all"
              type="button"
              onClick={handleDeleteAll}
            >
              <DeleteAllIcon />
            </button>
          )}
          <BoderBottomLine $isTyping={title.length > 0} />
        </InputWrapper>
        <SelectDate />
        <SelectTime onClick={handleSetType} />
      </ContentContainer>
      <ButtonContainer>
        <Button
          $style="solid"
          $theme="primary-purple"
          onClick={handleOnSubmit}
          disabled={title.length === 0}
        >
          다음
        </Button>
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

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  line-height: 21.48px;
`;

const InputWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 4px;

  .delete-all {
    position: absolute;
    right: 0;

    cursor: pointer;
  }
`;

const BoderBottomLine = styled.div<{ $isTyping: boolean }>`
  height: 1px;
  border: 1px solid
    ${({ theme, $isTyping }) =>
      $isTyping
        ? theme.color.secondary.solid.bk[600]
        : theme.color.secondary.solid.bk[300]};
`;

const Input = styled.input`
  border: none;
  background: none;

  ${({ theme }) => theme.typo.body.medium[16]}

  &::placeholder {
    color: ${({ theme }) => theme.color.secondary.solid.bk[600]};
  }
`;

export default MakeNewMeeting;
