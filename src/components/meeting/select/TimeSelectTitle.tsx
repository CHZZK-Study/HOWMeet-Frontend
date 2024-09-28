import styled from 'styled-components';

function TimeSelectTitle({ Title }: { Title: string }) {
  return (
    <TitleContainer>
      <TextContainer>{Title}</TextContainer>
    </TitleContainer>
  );
}

export default TimeSelectTitle;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  padding: 38px 20px 38px 20px;
  box-sizing: border-box;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
`;
