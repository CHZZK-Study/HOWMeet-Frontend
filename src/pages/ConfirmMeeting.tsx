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

function ConfirmMeeting() {
  const location = useLocation();

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
        <Button $style="solid" $theme="primary">
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
