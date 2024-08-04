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
  color: ${({ theme }) => theme.color.secondary.solid.bk[900]};

  .input-name {
    ${({ theme }) => theme.typo.body.semi_bold[18]}
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
  ${({ theme }) => theme.typo.body.medium[16]}
  border-radius: 0;
  ime-mode: active;
  background: none;

  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.secondary.solid.bk[300]};
  padding: 8px 0px;
  padding-right: 35px;

  &::placeholder {
    color: ${({ theme }) => theme.color.secondary.solid.bk[600]};
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }

  ${({ $isError, theme }) => {
    if ($isError) {
      return {
        borderBottom: `1px solid ${theme.color.secondary.solid.red.red}`,
        color: theme.color.secondary.solid.red.red,
        '&::placeholder': {
          color: theme.color.secondary.solid.red.red,
        },
        '&:focus': {
          borderBottom: `1px solid ${theme.color.secondary.solid.red.red}`,
        },
      };
    }
    return {
      borderBottom: `1px solid ${theme.color.secondary.solid.bk[300]}`,
      color: theme.color.secondary.solid.bk[900],
      '&::placeholder': {
        color: theme.color.secondary.solid.bk[600],
      },
      '&:focus': {
        borderBottom: `1px solid ${theme.color.secondary.solid.bk[900]}`,
      },
    };
  }}
`;

const ErrorMessage = styled.span`
  width: 100%;
  height: 14px;
  ${({ theme }) => theme.typo.body.medium[14]}
  color: ${({ theme }) => theme.color.secondary.solid.red.red};
`;
