import Header from '@/components/common/Header';
import RoomList from '@/components/roomlist/RoomList';
import { TITLE } from '@/constants/title';
import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import { PageTitle } from '@/styles/components/text';
import { CreateRoomPlusIcon } from 'public/assets/icons';
import styled from 'styled-components';

function MeetingListPage() {
  return (
    <FlexColContainer>
      <Header title="방 목록" />
      <ContentContainer>
        <Title>
          {TITLE.attendRoom} <span className="currentNumber">6</span>
        </Title>
        <RoomList />
        <CreateRoomButton>
          <CreateRoomPlusIcon />
        </CreateRoomButton>
      </ContentContainer>
    </FlexColContainer>
  );
}

const Title = styled(PageTitle)`
  ${({ theme }) => theme.typo.heading.bold[22]}

  .currentNumber {
    color: ${({ theme }) => theme.color.point.green};
  }
`;

const CreateRoomButton = styled.button`
  position: absolute;
  right: 16px;
  bottom: 64px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 52px;
  height: 52px;

  box-shadow: 0px 4px 12px 0px rgba(137, 137, 137, 0.25);
  border-radius: 100%;

  background: ${({ theme }) => theme.color.point.purple};
`;

export default MeetingListPage;
