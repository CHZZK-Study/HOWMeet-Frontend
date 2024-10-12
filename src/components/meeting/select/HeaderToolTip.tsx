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
    left: 10%; // 모바일 화면에서 위치 조정
    right: 10%;
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
    width: 15px; // 모바일 화면에서 화살표 크기 조정
    height: 15px;
  }
`;

const commonStyles = `
  font-size: 14px;
  color: ${theme.color.point.purple};
`;

export const UserName = styled.span`
  ${commonStyles}
  margin: 5px;

  @media (max-width: 768px) {
    font-size: 12px; // 모바일 화면에서 글자 크기 조정
  }
`;

const CloseButton = styled.button`
  ${commonStyles}
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;

  @media (max-width: 768px) {
    padding: 3px; // 모바일 화면에서 버튼 패딩 조정
  }
`;
