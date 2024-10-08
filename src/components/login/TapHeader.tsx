import styled from 'styled-components';
import { PATH } from '@/constants/path';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CancelIcon } from 'public/assets/icons';

function TapHeader() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const loginType = searchParams.get('type');

  const handleClickTap = (type: string) => {
    setSearchParams({ type });
  };

  return (
    <Header>
      <Title>
        <h1>로그인</h1>
        <Button type="button" onClick={() => navigate(PATH.main)}>
          <CancelIcon />
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
  background-color: ${({ theme }) => theme.color.secondary.solid.bk[50]};
  color: ${({ theme }) => theme.color.secondary.solid.bk[700]};

  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;
  z-index: 999;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 18px 0px;
  ${({ theme }) => theme.typo.body.medium[16]}
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
    border-bottom: 2px solid
      ${({ theme }) => theme.color.secondary.solid.bk[200]};
  }

  .bar {
    width: 50%;
    height: 2px;
    background-color: ${({ theme }) => theme.color.secondary.solid.bk[700]};

    transition: all 0.3s ease-in-out;
    position: absolute;
    bottom: 0;
    left: ${({ $loginType }) => ($loginType === 'non-member' ? '50%' : '0')};
  }
`;

const Tap = styled.button<{ $isSelected: boolean }>`
  ${({ theme }) => theme.typo.body.regular[16]}
  padding: 14px 16px;
  transition: all 0.3s ease-in-out;

  color: ${({ $isSelected, theme }) =>
    $isSelected
      ? theme.color.secondary.solid.bk[700]
      : theme.color.secondary.solid.bk[400]};
`;
