import Header from '@/components/common/Header';
import Attenders from '@/components/roomdetail/Attenders';
import ConfirmList from '@/components/roomdetail/ConfirmList';
import CreateNewMeeting from '@/components/roomdetail/CreateNewMeeting';
import NonConfirmList from '@/components/roomdetail/NonConfirmList';
import {
  FlexColContainer,
  ContentContainer,
} from '@/styles/components/container';
import { PageTitle } from '@/styles/components/text';
import { ShareIcon } from 'public/assets/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function RoomPage() {
  const navigate = useNavigate();

  return (
    <FlexColContainer>
      <Header title="방 정보" onLeftArrowIconClick={() => navigate(-1)} />
      <ContentContainer>
        <TitleWrapper>
          <PageTitle>마이팀 방</PageTitle>
          <ShareIcon />
        </TitleWrapper>
        <SubTitle>참여 인원</SubTitle>
        <Attenders />
        <SubTitle>확정되지 않은 일정</SubTitle>
        <Description>가능한 시간을 제출해주세요.</Description>
        <NonConfirmList />
        <SubTitle>전체 일정</SubTitle>
        <Description>확정된 일정을 확인해보세요 !</Description>
        <ConfirmList />
      </ContentContainer>
      <CreateNewMeeting />
    </FlexColContainer>
  );
}

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    margin-top: 20px;
    cursor: pointer;
  }
`;

const SubTitle = styled.h3`
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
  ${({ theme }) => theme.typo.body.semi_bold[22]}
`;

const Description = styled.h4`
  color: ${({ theme }) => theme.color.secondary.solid.bk[700]};
  ${({ theme }) => theme.typo.body.medium[18]}
`;

export default RoomPage;
