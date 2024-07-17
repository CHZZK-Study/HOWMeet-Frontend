import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import ICONS from '../../constants/icons';

function TapHeader() {
  const [searchParams, setSearchParams] = useSearchParams();
  const loginType = searchParams.get('type');

  const handleClickTap = (type: string) => {
    setSearchParams({ type });
  };

  return (
    <Header>
      <Title>
        <h1>로그인</h1>
        <Button>
          <img src={ICONS.common.x} alt="x" />
        </Button>
      </Title>
      <TapBar $loginType={loginType}>
        <div className="wrapper">
          <Tap
            $isSelected={loginType !== 'non-member'}
            onClick={() => handleClickTap('member')}
          >
            간편 로그인
          </Tap>
          <Tap
            $isSelected={loginType === 'non-member'}
            onClick={() => handleClickTap('non-member')}
          >
            비회원 방 만들기
          </Tap>
        </div>
        <div className="bar" />
      </TapBar>
    </Header>
  );
}

export default TapHeader;

const Header = styled.header`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.white};
  color: black;

  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 18px 0px;
  font-size: 16px;
  font-weight: 500;
  line-height: 175%;
  position: relative;
`;

const Button = styled.button`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 8px;
`;

const TapBar = styled.div<{ $loginType: string | null }>`
  width: 100%;
  position: relative;

  .wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 2px solid #eaeaea;
  }

  .bar {
    width: 50%;
    height: 2px;
    background-color: #4b4b4b;

    transition: all 0.3s ease-in-out;
    position: absolute;
    bottom: 0;
    left: ${({ $loginType }) => ($loginType === 'non-member' ? '50%' : '0')};
  }
`;

const Tap = styled.button<{ $isSelected: boolean }>`
  font-size: 14px;
  padding: 14px 16px;
  transition: all 0.3s ease-in-out;

  color: ${({ $isSelected }) => ($isSelected ? '#4b4b4b' : '#B4B4B4')};
`;
