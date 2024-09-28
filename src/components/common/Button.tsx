import React from 'react';
import styled, { css } from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $style: 'solid' | 'outlined';
  $theme?: 'primary-purple' | 'primary-green' | 'neutral';
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
  box-shadow: 0px 4px 10px 0px rgba(90, 90, 90, 0.1);

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
        color: ${$theme === 'primary-purple'
          ? theme.color.point.purple
          : theme.color.point.green};
        border: 1px solid
          ${$theme === 'primary-purple'
            ? theme.color.point.purple
            : theme.color.point.green};

        &:hover {
          background-color: ${$theme === 'primary-purple'
            ? theme.color.point.purple
            : theme.color.point.green};
          color: ${theme.color.primary.white};
        }
      `;
    }

    return css`
      background: ${$theme === 'primary-purple'
        ? theme.color.point.purple
        : theme.color.secondary.solid.bk[200]};
      color: ${$theme === 'primary-purple'
        ? theme.color.primary.white
        : theme.color.secondary.solid.bk[700]};
      border: none;
    `;
  }}

  ${({ theme }) => theme.typo.body.medium[16]}
`;
