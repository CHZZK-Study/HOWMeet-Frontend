import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label: string;
}

const RoomInput = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, label, ...props }, ref) => {
    return (
      <>
        <Label>{label}</Label>
        <InputWrapper>
          <Input ref={ref} placeholder={placeholder} {...props} />
          <BoderBottomLine />
        </InputWrapper>
      </>
    );
  }
);

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  line-height: 21.48px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BoderBottomLine = styled.div`
  height: 1px;
  border: 1px solid ${({ theme }) => theme.color.secondary.solid.bk[300]};
`;

const Input = styled.input`
  border: none;
  background: none;

  font-size: 16px;
  line-height: 26px;

  &::placeholder {
    color: ${({ theme }) => theme.color.secondary.solid.bk[600]};
  }
`;

export default RoomInput;
