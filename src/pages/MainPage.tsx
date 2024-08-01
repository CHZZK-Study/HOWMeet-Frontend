import Button from '@/components/common/Button';
import GuideList from '@/components/main/GuideList';
import {
  ButtonContainer,
  FlexColContainer,
} from '@/styles/components/container';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoTitle from 'public/assets/icons/logo/logo-title.svg?react';

function MainPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="wrapper">
        <TitleWrapper>
          <LogoTitle />
          <h2>우리 어떻게 만나?</h2>
        </TitleWrapper>
        <GuideList />
      </div>
      <ButtonContainer>
        <Button type="button" onClick={() => navigate('/login')}>
          시작하기
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default MainPage;

const Container = styled(FlexColContainer)`
  padding-top: 50px;
  justify-content: space-between;

  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 24px;
    gap: 48px;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  color: black;
  font-style: normal;

  h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 150%;
  }
`;
