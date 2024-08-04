import React, { forwardRef } from 'react';
import styled from 'styled-components';
import DeleteAll from 'public/assets/icons/common/delete-all.svg';
import { useFormContext } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label: string;
  name: string;
}

const RoomInput = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, label, name, ...props }, ref) => {
    const { setValue, watch, trigger } = useFormContext();

    const inputValue = watch(name);

    const handleDeleteAll = () => {
      setValue(name, '');
      trigger(name);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(name, event.currentTarget.value);
      trigger(name);
    };

    return (
      <>
        <Label>{label}</Label>
        <InputWrapper>
          <Input
            ref={ref}
            placeholder={placeholder}
            {...props}
            value={inputValue}
            onChange={(event) => handleChange(event)}
          />
          {inputValue.length > 0 && (
            <button
              className="delete-all"
              type="button"
              onClick={handleDeleteAll}
            >
              <img src={DeleteAll} alt="delete all" />
            </button>
          )}
          <BoderBottomLine $isTyping={inputValue.length > 0} />
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
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 4px;

  .delete-all {
    position: absolute;
    right: 0;

    cursor: pointer;
  }
`;

const BoderBottomLine = styled.div<{ $isTyping: boolean }>`
  height: 1px;
  border: 1px solid
    ${({ theme, $isTyping }) =>
      $isTyping
        ? theme.color.secondary.solid.bk[600]
        : theme.color.secondary.solid.bk[300]};
`;

const Input = styled.input`
  border: none;
  background: none;

  ${({ theme }) => theme.typo.body.medium[16]}

  &::placeholder {
    color: ${({ theme }) => theme.color.secondary.solid.bk[600]};
  }
`;

export default RoomInput;
