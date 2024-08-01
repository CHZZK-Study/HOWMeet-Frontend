import FORM from '@/constants/form';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import FormInput from './FormInput';

function LoginForm() {
  const { register } = useFormContext();
  return (
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
  );
}

export default LoginForm;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 45px;
`;
