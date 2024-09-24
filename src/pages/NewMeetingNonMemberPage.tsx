import Modal from '@/components/common/Modal';
import ConfirmMeeting from '@/components/newmeeting/ConfirmMeeting';
import LoginNonMember from '@/components/newmeeting/LoginNonMember';
import MakeNewMeeting from '@/components/newmeeting/MakeNewMeeting';
import QuitMakeMeetingModal from '@/components/newmeeting/QuitMakeMeetingModal';
import { useQuitMakeMeetingModal } from '@/store/useModalStore';
import { FlexColContainer } from '@/styles/components/container';
import { Content, MeetingData } from '@/types/meeting';
import { useState } from 'react';

function NewMeetingNonMemberPage() {
  const [currentContent, setCurrentContent] = useState<Content>('login');
  const [meetingData, setMeetingData] = useState<MeetingData>({
    name: { value: '' },
    dates: [],
    times: { startTime: '', endTime: '' },
  });
  const { close: closeQuit, isOpen: isQuitModalOpen } =
    useQuitMakeMeetingModal();

  return (
    <FlexColContainer>
      {currentContent === 'make' && (
        <MakeNewMeeting
          setContent={setCurrentContent}
          setMeetingData={setMeetingData}
        />
      )}
      {currentContent === 'confirm' && (
        <ConfirmMeeting
          meetingData={meetingData}
          setContent={setCurrentContent}
        />
      )}
      {currentContent === 'login' && <LoginNonMember />}
      {isQuitModalOpen && (
        <Modal onClose={closeQuit}>
          <QuitMakeMeetingModal />
        </Modal>
      )}
    </FlexColContainer>
  );
}

export default NewMeetingNonMemberPage;
