import guideData from '@/data/guide';
import styled from 'styled-components';

function GuideList() {
  return (
    <BoxContainer>
      {guideData.map((data) => (
        <GuideBox>
          <img src={data.icon} alt={data.alt} width={48} height={48} />
          <p>{data.text}</p>
        </GuideBox>
      ))}
    </BoxContainer>
  );
}

export default GuideList;

const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const GuideBox = styled.div`
  width: 100%;
  padding: 26px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0px 4px 10px 0px rgba(90, 90, 90, 0.1);
  white-space: pre-wrap;

  p {
    color: #3a3c40;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;
