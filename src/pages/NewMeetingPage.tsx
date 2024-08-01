import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import RoomInput from '@/components/room/RoomInput';
import SelectDate from '@/components/room/SelectDate';
import SelectTime from '@/components/room/SelectTime';
import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import { PageTitle } from '@/styles/components/text';
import styled from 'styled-components';

function NewMeetingPage() {
  return (
    <FlexColContainer>
      <Header title="일정 만들기" />
      <ContentContainer>
        <PageTitle>첫 일정도 만들어 보세요</PageTitle>
        <RoomInput placeholder="예) 새 일정" label="일정 이름" />
        <SelectDate />
        <SelectTime />
      </ContentContainer>
      <ButtonContainer>
        <Button $style="outlined">건너 뛰기</Button>
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
