import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import { PageTitle, SubTitle } from '@/styles/components/text';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { SUB_TITLE, TITLE } from '@/constants/title';
import ConfirmContent from '@/components/room/ConfirmContent';
import { useLocation } from 'react-router-dom';
import useMakeRoom from '@/hooks/useMakeRoom';
import useConvertTime from '@/hooks/useConvertTime';
import useMakeMemberMeeting from '@/hooks/useMakeMemberMeeting';

function ConfirmMeeting() {
  const location = useLocation();
  const isContainMeeting = !!location.state.req;
  const { convertTimeToPm } = useConvertTime();

  const meetingReq = {
    ...location.state.req,
    time: {
      startTime: isContainMeeting
        ? convertTimeToPm(location.state.req.time.startTime)
        : '',
      endTime: isContainMeeting
        ? convertTimeToPm(location.state.req.time.endTime)
        : '',
    },
  };
  const { handleMakeRoom } = useMakeRoom(isContainMeeting, meetingReq);
  const { handleMakeMemberMeeting } = useMakeMemberMeeting();

  const userInfo = sessionStorage.getItem('UserStore') || '';
  const parsedUserInfo = JSON.parse(userInfo);
  const userId = parsedUserInfo.state.user.id;

  const handleClickMakeRoom = () => {
    const roomData = {
      name: isContainMeeting
        ? location.state.req.roomName
        : location.state.roomName,
      leaderMemberId: Number(userId),
    };

    handleMakeRoom(roomData);
  };

  const handleClickMakeMeeting = () => {
    handleMakeMemberMeeting({ roomId: location.state.roomId, meetingReq });
  };

  return (
    <FlexColContainer>
      <ContentContainer>
        <HeaderWrapper>
          <PageTitle>{TITLE.confirmMeeting}</PageTitle>
        </HeaderWrapper>
        <SubTitle>{SUB_TITLE.newMeeting}</SubTitle>
        <ConfirmContent contents={location.state} />
      </ContentContainer>
      <ButtonContainer>
        <Button $style="solid" disabled>
          수정하기
        </Button>
        <Button
          $style="solid"
          $theme="primary-purple"
          onClick={
            location.state.hasRoom
              ? handleClickMakeMeeting
              : handleClickMakeRoom
          }
        >
          일정 생성
        </Button>
      </ButtonContainer>
    </FlexColContainer>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    margin-top: 20px;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;

  position: sticky;
  bottom: 16px;
  width: 100%;
  padding: 0 24px;
`;

export default ConfirmMeeting;
