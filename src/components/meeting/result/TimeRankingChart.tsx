import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';
import { ChartData } from '@/types/MakingGraph';
import getAdjustedColor from '@/utils/meeting/timetable/getAdjustedColor';
import 'react-tooltip/dist/react-tooltip.css';

interface ChartProps {
  data: ChartData[];
  maxPeople: number;
}

function TimeRankingChart({ data, maxPeople }: ChartProps) {
  const PLACES = ['top-end', 'bottom-end'];

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

  return (
    <ChartContainer>
      {Object.entries(groupedData)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([rank, items]) => (
          <RankGroup key={rank}>
            <RankLabel>{rank}순위</RankLabel>
            {items.map((item) => {
              const date = new Date(item.startTime);
              const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
              const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}(${dayNames[date.getDay()]})`;
              const startTime = item.startTime.split('T')[1].slice(0, 5);
              const endTime = item.endTime.split('T')[1].slice(0, 5);
              const barWidth = (item.userCount / maxPeople) * 100;

              return (
                <BarContainer
                  key={item.startTime}
                  width={barWidth}
                  data-tooltip-id="chart-tooltip"
                  data-tooltip-content={item.users.join(', ')}
                >
                  <Bar>
                    <DateTimeLabel>{`${formattedDate} ${startTime}-${endTime}`}</DateTimeLabel>
                    <CountLabel>{`${item.userCount}명`}</CountLabel>
                  </Bar>
                </BarContainer>
              );
            })}
          </RankGroup>
        ))}
      <Tooltip
        id="chart-tooltip"
        place="bottom"
        style={{
          backgroundColor: 'white',
          color: 'black',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      />
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

export default TimeRankingChart;
