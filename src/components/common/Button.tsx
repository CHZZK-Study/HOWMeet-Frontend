import React from 'react';
import styled, { css } from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $style: 'solid' | 'outlined';
}

function Button({ $style, ...props }: Props) {
  return (
    <StyledButton
      $style={$style}
      {...props}
      disabled={props.disabled || false}
    />
  );
}

export default Button;

const StyledButton = styled.button<Props>`
  width: 100%;
<<<<<<< HEAD
  background-color: ${({ disabled }) => (disabled ? '#D0D0D0' : '#642DFF')};
=======
>>>>>>> dev
  text-align: center;
  padding: 16px 0;
  border-radius: 8px;

  ${({ theme, $style, disabled }) => {
    if (disabled) {
      return css`
        color: ${theme.color.primary.white};
        background: #d0d0d0;
        border: none;
      `;
    }
    if ($style === 'outlined') {
      return css`
        background: ${theme.color.primary.white};
        color: ${theme.color.point.purple};
        border: 1px solid ${theme.color.point.purple};

        &:hover {
          background-color: ${theme.color.point.purple};
          color: ${theme.color.primary.white};
        }
      `;
    }
    return css`
      background: ${theme.color.point.purple};
      color: ${theme.color.primary.white};
      border: none;
    `;
  }}

  ${({ theme }) => theme.typo.heading.bold[16]}
`;
