import React from 'react';
import styled, { css } from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $style: 'solid' | 'outlined';
  $theme?: 'primary' | 'neutral';
}

function Button({ $style, $theme, ...props }: Props) {
  return (
    <StyledButton
      $style={$style}
      $theme={$theme}
      {...props}
      disabled={props.disabled || false}
    />
  );
}

export default Button;

const StyledButton = styled.button<Props>`
  width: 100%;
  text-align: center;
  padding: 16px 0;
  border-radius: 8px;

  ${({ theme, $style, $theme, disabled }) => {
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
      background: ${$theme === 'primary'
        ? theme.color.point.purple
        : theme.color.secondary.solid.bk[200]};
      color: ${$theme === 'primary'
        ? theme.color.primary.white
        : theme.color.secondary.solid.bk[700]};
      border: none;
    `;
  }}

  ${({ theme }) => theme.typo.heading.bold[16]}
`;
