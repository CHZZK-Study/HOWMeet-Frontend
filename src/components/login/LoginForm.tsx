import FORM from '@/constants/form';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useLogin } from '@/hooks/useLogin';
import { ButtonContainer } from '@/styles/components/container';
import FormInput from './FormInput';
import LoginGuide from './LoginGuide';
import Button from '../common/Button';

interface LoginFormType {
  nickname: string;
  password: string;
}

interface Props {
  meetingId: string;
}

function LoginForm({ meetingId }: Props) {
  const { handleLogin } = useLogin();
  const methods = useForm<LoginFormType>({ mode: 'onChange' });
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = methods;

  return (
    <Form
      onSubmit={handleSubmit((data) =>
        handleLogin({ ...data, guestScheduleId: meetingId })
      )}
    >
      <FormProvider {...methods}>
        <InputContainer>
          <FormInput
            autoFocus
            type="text"
            fieldName="nickname"
            placeholder="닉네임 입력"
            {...register('nickname', {
              required: true,
              pattern: FORM.nickname.regExp,
              validate: (value: string) => {
                const regexp = /^(?:[_-]+)$/;
                return !regexp.test(value);
              },
            })}
          />
          <FormInput
            type="password"
            fieldName="password"
            placeholder="영문 또는 숫자로 4자리 이상 입력"
            hasVisibility
            {...register('password', {
              required: true,
              pattern: FORM.password.regExp,
            })}
          />
        </InputContainer>
        <LoginGuide />
        <ButtonContainer>
          <Button type="submit" $style="solid" disabled={!isValid}>
            완료
          </Button>
        </ButtonContainer>
      </FormProvider>
    </Form>
  );
}

export default LoginForm;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 45px;
`;
