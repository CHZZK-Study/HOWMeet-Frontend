// 화살표가있는 navbar입니다
// 파리미터로 타이틀 제목과 글자의 위치 스타일드 컴포넌트 변경이 가능합니다
// 사용 예시
// <ArrowNavbar title="타이틀" arrowPosition="left" />

import React from 'react';

import styled from 'styled-components';

interface Props {
  title: string;
  arrowPosition: 'left' | 'right';
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #d0d0d0;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const ArrowLeft = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid black;
`;

const ArrowRight = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid black;
`;

function ArrowNavbar({ title, arrowPosition }: Props) {
  return (
    <Container>
      {arrowPosition === 'left' && <ArrowLeft />}
      {arrowPosition === 'right' && <span />}
      <Title>{title}</Title>
      {arrowPosition === 'left' && <span />}
      {arrowPosition === 'right' && <ArrowRight />}
    </Container>
  );
}

export default ArrowNavbar;
