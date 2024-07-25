import Button from '@/components/common/Button';
import GuideList from '@/components/main/GuideList';
import { FlexColContainer } from '@/styles/components/container';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
        
function MainPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="wrapper">
        <TitleWrapper>
          <h1>How Meet?</h1>
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
  gap: 40px;
  padding: 50px 24px 24px 24px;
  justify-content: space-between;

  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  color: black;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;

  h1 {
    font-size: 28px;
  }

  h2 {
    font-size: 24px;
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
  padding-bottom: 24px;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    #fff 18.82%,
    #fff 100%
  );
`;
