import styled from 'styled-components';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
`;

function TimeSelectTitle() {
  return (
    <TitleContainer>
      <TextContainer>가능한 시간을 드래그해주세요!</TextContainer>
    </TitleContainer>
  );
}

export default TimeSelectTitle;
