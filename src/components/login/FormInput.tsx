import FORM from '@/constants/form';
import ICONS from '@/constants/icons';
import React, { ForwardedRef, forwardRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

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
        <span className="input-name">{fieldName}</span>
        <div className="input-container">
          <InputWrapper>
            <Input
              ref={ref}
              type={isVisible ? 'text' : type}
              placeholder="닉네임 입력"
              $isError={!!errors[fieldName]}
              inputMode={type === 'password' ? 'numeric' : 'text'}
              {...props}
            />
            {hasVisibility && (
              <button
                className="icon"
                type="button"
                onClick={() => setIsVisible((prev) => !prev)}
              >
                <img
                  src={
                    isVisible
                      ? ICONS.form.visibility_on
                      : ICONS.form.visibility_off
                  }
                  alt="clear"
                  width={20}
                />
              </button>
            )}
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
  gap: 20px;
  color: black;

  .input-name {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
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

  .icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Input = styled.input<{ $isError: boolean }>`
  width: 100%;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  border-radius: 0;
  ime-mode: active;

  border: none;
  border-bottom: 2px solid rgba(31, 31, 60, 0.12);
  padding: 8px 0px;
  padding-right: 35px;

  &::placeholder {
    font-weight: 400;
  }

  &:focus {
    outline: none;
  }

  ${({ $isError }) => {
    if ($isError) {
      return {
        borderBottom: '2px solid red',
        color: 'red',
        '&::placeholder': {
          color: 'red',
        },
        '&:focus': {
          borderBottom: '2px solid red',
        },
      };
    }
    return {
      borderBottom: '2px solid rgba(31, 31, 60, 0.12)',
      color: 'black',
      '&::placeholder': {
        color: 'rgba(31, 31, 60, 0.4)',
      },
      '&:focus': {
        borderBottom: '2px solid black',
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
  color: red;
`;
