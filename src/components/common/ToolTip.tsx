import styled from 'styled-components';

interface ToolTipProps {
  content: string;
  x: number;
  y: number;
}

function ToolTip({ content, x, y }: ToolTipProps) {
  return (
    <ToolTipWrapper style={{ top: `${y + 10}px` }}>
      <TooltipArrow style={{ left: `${x}px` }} />
      <CustomTooltip>
        <TooltipContent>
          <UserName>{content}</UserName>
        </TooltipContent>
      </CustomTooltip>
    </ToolTipWrapper>
  );
}

export default ToolTip;

const ToolTipWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const CustomTooltip = styled.div`
  position: relative;
  background-color: white;
  border-radius: 8px;
  z-index: 999;
  padding: 10px;
  width: 90%;
  border: 1px solid rgba(100, 45, 255, 1);
`;

export const TooltipArrow = styled.div`
  position: absolute;
  top: -10px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-top: 1px solid rgba(100, 45, 255, 1);
  border-left: 1px solid rgba(100, 45, 255, 1);
  transform: translateX(-50%) rotate(45deg);
  z-index: 1000;
`;

export const TooltipContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const UserName = styled.span`
  margin: 5px;
  font-size: 14px;
  font-weight: bold;
`;
