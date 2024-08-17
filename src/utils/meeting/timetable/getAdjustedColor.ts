// 결과 화면 색깔을 나타내주는 함수
// ratio에 따라 색깔이 변함

import { AdjustColorProps } from '@/types/timeTableTypes';

const getAdjustedColor = ({ ratio }: AdjustColorProps) => {
  const r = 23;
  const g = 182;
  const b = 9;

  const adjustedR = Math.round(r + (255 - r) * (1 - ratio));
  const adjustedG = Math.round(g + (255 - g) * (1 - ratio));
  const adjustedB = Math.round(b + (255 - b) * (1 - ratio));

  return `#${adjustedR.toString(16).padStart(2, '0')}${adjustedG.toString(16).padStart(2, '0')}${adjustedB.toString(16).padStart(2, '0')}`;
};

export default getAdjustedColor;
