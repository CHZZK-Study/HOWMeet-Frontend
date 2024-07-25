import guideData from '@/data/guide';
import React from 'react';
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
  background: rgba(0, 0, 0, 0.04);
  white-space: pre-wrap;

  p {
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;
