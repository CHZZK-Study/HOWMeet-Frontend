import React from 'react';
import styled from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function Button(props: Props) {
  return <StyledButton {...props} disabled={props.disabled || false} />;
}

export default Button;

const StyledButton = styled.button<{ disabled: boolean }>`
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
