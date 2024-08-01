import Button from '@/components/common/Button';
import GuideList from '@/components/main/GuideList';
import { FlexColContainer } from '@/styles/components/container';
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

const ButtonContainer = styled.div`
  width: 100%;
  height: 130px;
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 999;

  display: flex;
  align-items: end;
  padding: 24px;
  padding-top: 0px;

  background: linear-gradient(
    180deg,
    rgba(244, 245, 245, 0) 0%,
    #f4f5f5 18.82%,
    #f4f5f5 100%
  );
`;
