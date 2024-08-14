import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChartData, RankedTimeSlot } from '@/types/MakingGraph';
import getAdjustedColor from '@/utils/meeting/timetable/getAdjustedColor';

interface ChartProps {
  data: RankedTimeSlot[];
  maxPeople: number;
}

function TimeRankingChart({ data, maxPeople }: ChartProps) {
  const [activeItem, setActiveItem] = useState<ChartData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    top: 0,
    left: 0,
    arrowLeft: '50%',
  });
  const chartRef = useRef<HTMLDivElement>(null);

  const groupedData = data.reduce(
    (acc, item) => {
      if (!acc[item.rank]) {
        acc[item.rank] = [];
      }
      acc[item.rank].push(item);
      return acc;
    },
    {} as Record<number, ChartData[]>
  );

  useEffect(() => {
    if (activeItem && chartRef.current) {
      const barElement = document.getElementById(`bar-${activeItem.startTime}`);
      if (barElement) {
        const barRect = barElement.getBoundingClientRect();
        const chartRect = chartRef.current.getBoundingClientRect();
        const barCenter = barRect.left + barRect.width / 2 - chartRect.left;
        setTooltipPosition({
          top: barRect.bottom - chartRect.top + 10,
          left: Math.max(0, Math.min(chartRect.width - 200, barCenter - 100)), // 툴팁 너비를 200px로 가정
          arrowLeft: `${barCenter - Math.max(0, Math.min(chartRect.width - 200, barCenter - 100))}px`,
        });
      }
    }
  }, [activeItem]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}(${dayNames[date.getDay()]})`;
  };

  const formatTime = (timeString: string) =>
    timeString.split('T')[1].slice(0, 5);

  return (
    <ChartContainer ref={chartRef}>
      {Object.entries(groupedData)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([rank, items]) => (
          <RankGroup key={rank}>
            <RankLabel>{rank}순위</RankLabel>
            {items.map((item) => (
              <BarContainer
                key={item.startTime}
                id={`bar-${item.startTime}`}
                width={(item.userCount / maxPeople) * 100}
                onMouseEnter={() => setActiveItem(item)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <Bar>
                  <DateTimeLabel>
                    {`${formatDate(item.startTime)} ${formatTime(item.startTime)}-${formatTime(item.endTime)}`}
                  </DateTimeLabel>
                  <CountLabel>{`${item.userCount}명`}</CountLabel>
                </Bar>
              </BarContainer>
            ))}
          </RankGroup>
        ))}
      {activeItem && (
        <CustomTooltip
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          <TooltipArrow style={{ left: tooltipPosition.arrowLeft }} />
          <TooltipContent>
            {activeItem.users.map((user, index) => (
              <UserName key={`${activeItem.startTime}-${index}`}>
                {user}
              </UserName>
            ))}
          </TooltipContent>
        </CustomTooltip>
      )}
    </ChartContainer>
  );
}

const ChartContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  position: relative;
`;

const RankGroup = styled.div`
  margin-bottom: 20px;
`;

const RankLabel = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BarContainer = styled.div<{ width: number }>`
  background-color: ${getAdjustedColor({ ratio: 1 })};
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  width: ${(props) => props.width}%;
  min-width: 50%;
  cursor: pointer;
`;

const Bar = styled.div`
  padding: 15px;
  color: white;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
`;

const DateTimeLabel = styled.span`
  flex-grow: 1;
`;

const CountLabel = styled.span`
  font-weight: bold;
`;

const CustomTooltip = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 100%;
`;

const TooltipArrow = styled.div`
  position: absolute;
  top: -10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
  transform: translateX(-50%);
`;

const TooltipContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const UserName = styled.span`
  margin: 5px;
  font-size: 14px;
  font-weight: bold;
`;

export default TimeRankingChart;
