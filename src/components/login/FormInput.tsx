import FORM from '@/constants/form';
import React, { ForwardedRef, forwardRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import FormInputButton from './FormInputButton';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'password';
  fieldName: 'nickname' | 'password';
  hasVisibility?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    { type, fieldName, hasVisibility = false, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const {
      formState: { errors },
    } = useFormContext();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <Container>
        <span className="input-name">{FORM[fieldName].title}</span>
        <div className="input-container">
          <InputWrapper>
            <Input
              ref={ref}
              type={isVisible ? 'text' : type}
              $isError={!!errors[fieldName]}
              inputMode={type === 'password' ? 'numeric' : 'text'}
              {...props}
            />
            <FormInputButton
              hasVisibility={hasVisibility}
              fieldName={fieldName}
              isVisible={isVisible}
              toggleVisibility={() => setIsVisible((prev) => !prev)}
            />
          </InputWrapper>
          <ErrorMessage>
            {errors[fieldName] && FORM[fieldName].message}
          </ErrorMessage>
        </div>
      </Container>
    );
  }
);

export default FormInput;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: black;

  .input-name {
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
  }

  .input-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Input = styled.input<{ $isError: boolean }>`
  width: 100%;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  border-radius: 0;
  ime-mode: active;
  background: none;

  border: none;
  border-bottom: 1px solid rgba(31, 31, 60, 0.12);
  padding: 8px 0px;
  padding-right: 35px;

  &::placeholder {
    color: #84888f;
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }

  ${({ $isError }) => {
    if ($isError) {
      return {
        borderBottom: '1px solid #F34822',
        color: '#F34822',
        '&::placeholder': {
          color: '#F34822',
        },
        '&:focus': {
          borderBottom: '1px solid #F34822',
        },
      };
    }
    return {
      borderBottom: '1px solid rgba(31, 31, 60, 0.12)',
      color: 'black',
      '&::placeholder': {
        color: 'rgba(31, 31, 60, 0.4)',
      },
      '&:focus': {
        borderBottom: '1px solid black',
      },
    };
  }}
`;

const ErrorMessage = styled.span`
  width: 100%;
  height: 14px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  color: #f34822;
`;
