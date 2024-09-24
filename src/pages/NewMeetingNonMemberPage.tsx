import ConfirmMeeting from '@/components/newmeeting/ConfirmMeeting';
import LoginNonMember from '@/components/newmeeting/LoginNonMember';
import MakeNewMeeting from '@/components/newmeeting/MakeNewMeeting';
import { FlexColContainer } from '@/styles/components/container';
import { Content, MeetingData } from '@/types/meeting';
import { useState } from 'react';

function NewMeetingNonMemberPage() {
  const [currentContent, setCurrentContent] = useState<Content>('make');
  const [meetingData, setMeetingData] = useState<MeetingData>({
    name: { value: '' },
    dates: [],
    times: { startTime: '', endTime: '' },
  });

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
    </FlexColContainer>
  );
}

export default NewMeetingNonMemberPage;
