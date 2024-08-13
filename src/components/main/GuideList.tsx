import guideData from '@/data/guide';
import styled from 'styled-components';

function GuideList() {
  return (
    <BoxContainer>
      {guideData.map((data) => (
        <GuideBox>
          {data.icon}
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
  background-color: ${({ theme }) => theme.color.primary.white};
  box-shadow: 0px 4px 10px 0px rgba(90, 90, 90, 0.1);
  white-space: pre-wrap;

  p {
    color: ${({ theme }) => theme.color.secondary.solid.bk[800]};
    text-align: center;
    ${({ theme }) => theme.typo.body.regular[18]}
  }
`;
