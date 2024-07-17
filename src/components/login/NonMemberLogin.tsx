import { Title } from '@/styles/components/text';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import FORM from '@/constants/form';
import FormInput from './FormInput';

interface NonMemberForm {
  nickname: string;
  password: string;
}

function NonMemberLogin() {
  const methods = useForm<NonMemberForm>({ mode: 'onChange' });
  const {
    register,
    trigger,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const handleSubmitForm = (data: NonMemberForm) => {
    // TODO: 서버 연동
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(handleSubmitForm)}>
        <Wrapper>
          <TitleWrapper>
            <Title>
              비회원으로 이용하면
              <br />
              일정을 <strong>한 번만</strong> 조율할 수 있어요
            </Title>
            <Caption>
              *결과 공유 후에는 결과 외의 모든 데이터가 삭제됩니다.
            </Caption>
          </TitleWrapper>

          <InputContainer>
            <FormInput
              type="text"
              fieldName="nickname"
              {...register('nickname', {
                required: true,
                pattern: FORM.nickname.regExp,
                onBlur: () => {
                  trigger('nickname');
                },
              })}
            />
            <FormInput
              type="password"
              fieldName="password"
              hasVisibility
              {...register('password', {
                required: true,
                pattern: /^\d{4,}$/,
                onBlur: () => {
                  trigger('password');
                },
              })}
            />
          </InputContainer>

          <Caption>
            *비회원 방 만들기는 1회 성으로 완료 버튼을 선택하면 바로 방이
            만들어집니다. <strong>비밀번호를 잃지 않게 메모해 두세요!</strong>
          </Caption>
        </Wrapper>
        <SubmitButton type="submit" disabled={!isValid}>
          완료
        </SubmitButton>
      </Form>
    </FormProvider>
  );
}

export default NonMemberLogin;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Form = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 60px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Caption = styled.span`
  color: #5e5e5e;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;

  strong {
    color: red;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 45px;
`;

const SubmitButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  background-color: ${({ disabled }) => (disabled ? '#D0D0D0' : '#212121')};
  text-align: center;
  padding: 16px 0;
  border-radius: 8px;

  color: white;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
`;
