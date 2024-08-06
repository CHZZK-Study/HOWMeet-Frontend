import styled from 'styled-components';

function MeetingHeader() {
  return (
    <HeaderContainer>
      <Title>취지직 전체회의</Title>
    </HeaderContainer>
  );
}

export default MeetingHeader;

const HeaderContainer = styled.div`
  display: flex;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  align-items: center;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
`;
