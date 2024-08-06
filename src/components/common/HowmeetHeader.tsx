import styled from 'styled-components';

function HowMeetHeader() {
  return (
    <HeaderContainer>
      <Title>Howmeet</Title>
    </HeaderContainer>
  );
}

export default HowMeetHeader;

const HeaderContainer = styled.div`
  display: flex;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  align-items: center;
`;

const Title = styled.div`
  font-size: 25px;
`;
