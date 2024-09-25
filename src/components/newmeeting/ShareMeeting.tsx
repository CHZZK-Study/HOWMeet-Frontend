import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import { PageTitle } from '@/styles/components/text';
import styled, { useTheme } from 'styled-components';
import { AlertIcon, ShareIcon } from 'public/assets/icons';
import { useState } from 'react';
import Button from '../common/Button';

function ShareMeeting() {
  const theme = useTheme();
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  const handleOnMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleOnMouseOut = () => {
    setIsMouseOver(false);
  };

  return (
    <FlexColContainer>
      <ContentContainer>
        <PageTitleWrapper>
          <PageTitle>일정 생성 완료!</PageTitle>
          <SubTitle>일정 조율까지 완료해 보세요</SubTitle>
        </PageTitleWrapper>
        <PopUpContainer>
          <InfoWrapper>
            <TitleIconWrapper>
              <AlertIcon />
              <Title>확인해 주세요!</Title>
            </TitleIconWrapper>
            <InfoDesc>
              비회원의 경우 재로그인은
              <br />
              생성된 일정의 링크를 통해서만 가능합니다.
              <br />
              아래의 버튼을 눌러 주소를 보관해 주세요.
            </InfoDesc>
          </InfoWrapper>
          <ShareButton
            onMouseOut={handleOnMouseOut}
            onMouseOver={handleOnMouseOver}
          >
            <ShareIcon
              fill={
                isMouseOver
                  ? theme.color.primary.white
                  : theme.color.point.purple
              }
            />
            링크 복사하기
          </ShareButton>
        </PopUpContainer>
      </ContentContainer>
      <ButtonContainer>
        <Button $style="solid" $theme="primary-purple">
          확인
        </Button>
      </ButtonContainer>
    </FlexColContainer>
  );
}

const PageTitleWrapper = styled.div`
  margin-top: 52px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.h3`
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
  ${({ theme }) => theme.typo.body.semi_bold[20]}
`;

const ButtonContainer = styled.div`
  position: sticky;
  bottom: 16px;
  width: 100%;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PopUpContainer = styled.div`
  width: 100%;
  margin-top: 20%;
  padding: 26px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: ${({ theme }) => theme.color.primary.white};
  box-shadow: 0px 4px 10px 0px rgba(90, 90, 90, 0.1);
  border-radius: 12px;
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TitleIconWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

const Title = styled(PageTitle)`
  margin: 0;
  padding: 0;
  font-weight: 600;
`;

const InfoDesc = styled.p`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
  ${({ theme }) => theme.typo.body.regular[14]}
`;

const ShareButton = styled.button`
  width: 100%;
  text-align: center;
  padding: 16px 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.color.point.purple};
  color: ${({ theme }) => theme.color.point.purple};
  ${({ theme }) => theme.typo.body.medium[16]}

  &:hover {
    background: ${({ theme }) => theme.color.point.purple};
    color: ${({ theme }) => theme.color.primary.white};
  }
`;
export default ShareMeeting;
