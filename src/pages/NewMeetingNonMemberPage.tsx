import Modal from '@/components/common/Modal';
import ConfirmMeeting from '@/components/newmeeting/ConfirmMeeting';
import LoginNonMember from '@/components/newmeeting/LoginNonMember';
import MakeNewMeeting from '@/components/newmeeting/MakeNewMeeting';
import QuitMakeMeetingModal from '@/components/newmeeting/QuitMakeMeetingModal';
import useStepStore from '@/store/meeting/useStepStore';
import ShareMeeting from '@/components/newmeeting/ShareMeeting';
import { useQuitMakeMeetingModal } from '@/store/useModalStore';
import { FlexColContainer } from '@/styles/components/container';
import { MeetingData } from '@/types/meeting';
import { useState } from 'react';

function NewMeetingNonMemberPage() {
  const { step, setStep } = useStepStore();
  const [meetingData, setMeetingData] = useState<MeetingData>({
    name: { value: '' },
    dates: [],
    times: { startTime: '', endTime: '' },
  });
  const { close: closeQuit, isOpen: isQuitModalOpen } =
    useQuitMakeMeetingModal();

  return (
    <FlexColContainer>
      {step === 'make' && (
        <MakeNewMeeting setContent={setStep} setMeetingData={setMeetingData} />
      )}
      {step === 'confirm' && (
        <ConfirmMeeting meetingData={meetingData} setContent={setStep} />
      )}
      {step === 'login' && <LoginNonMember />}
      {step === 'share' && <ShareMeeting />}
      {isQuitModalOpen && (
        <Modal onClose={closeQuit}>
          <QuitMakeMeetingModal />
        </Modal>
      )}
    </FlexColContainer>
  );
}

export default NewMeetingNonMemberPage;
