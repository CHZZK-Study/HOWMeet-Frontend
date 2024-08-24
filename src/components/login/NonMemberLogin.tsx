import { GuestTitle, Title } from '@/styles/components/text';
import { useLogin } from '@/hooks/useLogin';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ButtonContainer } from '@/styles/components/container';
import Button from '../common/Button';
import LoginForm from './LoginForm';

interface NonMemberForm {
  nickname: string;
  password: string;
}

interface Props {
  type?: 'guest' | 'default';
}

function NonMemberLogin({ type = 'default' }: Props) {
  const { handleLogin } = useLogin();
  const methods = useForm<NonMemberForm>({ mode: 'onChange' });
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(handleLogin)}>
        <Wrapper>
          {type === 'guest' ? (
            <GuestTitle>
              <h2>일정 이름</h2>
              <span>
                비회원으로 일정을 만든 경우에는
                <br />
                결과가 공유될 때 로그인 정보가 삭제됩니다.
              </span>
            </GuestTitle>
          ) : (
            <LoginTitle>
              비회원으로 이용하면
              <br />
              일정을 <strong>한 번만</strong> 조율할 수 있어요
            </LoginTitle>
          )}

          <LoginForm />

          <Guide>
            <h3>로그인 전 꼭 확인해 두세요!</h3>
            <ul>
              <li>비회원 일정 생성은 1회성입니다.</li>
              <li>
                새로운 일정 조율을 원하시면 사용 중이 아닌 새로운 닉네임과
                비밀번호로 로그인 해주세요.
              </li>
              <li>
                10일간 일정 확정이 되지 않을 경우 일정이 자동으로 삭제됩니다.
              </li>
              <li>결과 공유 후에 결과 화면은 10일 뒤 자동으로 삭제됩니다.</li>
              <li>
                로그인 완료 시 바로 새로운 일정을 조율할 수 있어요. 비밀번호를
                잃지 않게 기억해 주세요!
              </li>
            </ul>
          </Guide>
        </Wrapper>
        <ButtonContainer>
          <Button type="submit" $style="solid" disabled={!isValid}>
            완료
          </Button>
        </ButtonContainer>
      </Form>
    </FormProvider>
  );
}

export default NonMemberLogin;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 60px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 0 20px;
`;

const LoginTitle = styled(Title)`
  padding-top: 30px;
`;

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
