// styles/ToasterStyles.ts
import { CSSProperties } from 'react';
import theme from './theme';

// Toaster 스타일 변수
export const toasterStyle: CSSProperties = {
  padding: '16px',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#3A3C40',
  color: theme.color.primary.white,
};
