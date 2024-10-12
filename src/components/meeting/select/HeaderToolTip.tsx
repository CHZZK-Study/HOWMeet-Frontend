import { TooltipContent } from '@/components/common/ToolTip';
import theme from '@/styles/theme';
import styled from 'styled-components';

interface ToolTipProps {
  content: string;
  toggle: () => void;
}

function ToolTip({ content, toggle }: ToolTipProps) {
  return (
    <ToolTipWrapper>
      <TooltipArrow />
      <CustomTooltip>
        <TooltipContent>
          <UserName>{content}</UserName>
          <CloseButton onClick={toggle}>X</CloseButton>
        </TooltipContent>
      </CustomTooltip>
    </ToolTipWrapper>
  );
}

export default ToolTip;

const ToolTipWrapper = styled.div`
  position: absolute;
  left: 30%;
  right: 2%;
  top: 50px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    left: auto; // 모바일 화면에서 왼쪽 위치를 자동으로 설정
    right: 5%; // 모바일 화면에서 오른쪽으로 이동
    top: 70px; // 모바일 화면에서 약간 아래로 내려가게 설정
  }
`;

const CustomTooltip = styled.div`
  position: relative;
  background-color: white;
  border-radius: 96px;
  z-index: 999;
  padding: 1px;
  width: 100%;
  border: 1px solid rgba(100, 45, 255, 1);

  @media (max-width: 768px) {
    padding: 5px; // 모바일 화면에서 패딩 조정
    width: 90%; // 모바일에서 툴팁의 너비를 조정
  }
`;

export const TooltipArrow = styled.div<{ isAbove?: boolean }>`
  position: absolute;
  top: ${({ isAbove }) => (isAbove ? `36px` : `-9.5px`)};
  width: 20px;
  height: 20px;
  background-color: white;
  ${({ isAbove }) =>
    isAbove ? 'border-bottom' : 'border-top'}: 1px solid rgba(100, 45, 255, 1);
  ${({ isAbove }) =>
    isAbove ? 'border-right' : 'border-left'}: 1px solid rgba(100, 45, 255, 1);
  transform: rotate(45deg);
  z-index: 1000;
  right: 7%;

  @media (max-width: 768px) {
    right: 10%; // 모바일 화면에서 화살표 위치를 조정하여 더 오른쪽으로 이동
    top: ${({ isAbove }) =>
      isAbove ? `40px` : `-12px`}; // 모바일 화면에서 화살표 위치 약간 조정
    width: 15px; // 화살표 크기 축소
    height: 15px;
  }
`;

const commonStyles = `
  font-size: 14px;
  color: ${theme.color.point.purple};

  @media (max-width: 768px) {
    font-size: 12px; // 모바일 화면에서 글자 크기 축소
  }
`;

export const UserName = styled.span`
  ${commonStyles}
  margin: 5px;

  @media (max-width: 768px) {
    font-size: 10px; // 모바일 화면에서 더 작은 글씨 크기
  }
`;

const CloseButton = styled.button`
  ${commonStyles}
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;

  @media (max-width: 768px) {
    padding: 3px; // 모바일 화면에서 버튼 패딩 축소
    font-size: 10px; // 모바일에서 버튼 글씨 크기도 작게
  }
`;
