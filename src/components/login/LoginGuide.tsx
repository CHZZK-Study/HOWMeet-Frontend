import styled from 'styled-components';

function LoginGuide() {
  return (
    <Guide>
      <h3>확인해 주세요</h3>
      <ul>
        <li>비회원 일정 생성은 일회성입니다.</li>
        <li>
          회원에게 제공되는 일정 확정, 방 생성, 진행 알림 등의 기능은 비회원에게
          제공되지 않습니다.
        </li>
        <li>비회원으로 생성한 일정은 일정 생성 10일 후 자동삭제됩니다.</li>
        <li>
          재로그인 시에는 비회원 일정 생성 후 만들어지는 링크를 통해서만
          가능합니다.
        </li>
        <li>
          일회성 회원가입 특성상 아이디 찾기/비밀번호 찾기 기능이 제공되지
          않습니다. 잊어버리지 않도록 로그인 정보를 반드시 기억해주세요!
        </li>
      </ul>
    </Guide>
  );
}

export default LoginGuide;

const Guide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h3 {
    color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
    ${({ theme }) => theme.typo.body.medium[22]}
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  li {
    list-style-type: disc;
    margin-left: 18px;
    color: ${({ theme }) => theme.color.secondary.solid.bk[600]};
    ${({ theme }) => theme.typo.body.regular[12]}
  }
`;
