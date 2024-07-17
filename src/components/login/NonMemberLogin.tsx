import { Title } from '@/styles/components/text';
import React from 'react';
import styled from 'styled-components';
import FormInput from './FormInput';

function NonMemberLogin() {
  return (
    <>
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
          <FormInput type="text" fieldName="닉네임" />
          <FormInput type="password" fieldName="비밀번호" hasVisibility />
        </InputContainer>

        <Caption>
          *비회원 방 만들기는 1회 성으로 완료 버튼을 선택하면 바로 방이
          만들어집니다. <strong>비밀번호를 잃지 않게 메모해 두세요!</strong>
        </Caption>
      </Wrapper>
      <SubmitButton type="button" disabled={false}>
        완료
      </SubmitButton>
    </>
  );
}

export default NonMemberLogin;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
