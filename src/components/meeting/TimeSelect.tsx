import React, { useState } from 'react';
import HeatMap from 'react-heatmap-grid';

const xLabels = [
  '7/11\n월',
  '7/12\n화',
  '7/13\n수',
  '7/14\n목',
  '7/15\n금',
  '7/16\n토',
  '7/17\n일',
];
const yLabels = new Array(13).fill(0).map((_, i) => `${i + 10}`);

export default function TimeSelect() {
  const [data, setData] = useState(
    new Array(yLabels.length)
      .fill(0)
      .map(() => new Array(xLabels.length).fill(0))
  );

  const handleClick = (x, y) => {
    const newData = data.map((row, i) =>
      row.map((cell, j) => (i === y && j === x ? (cell === 0 ? 1 : 0) : cell))
    );
    setData(newData);
  };

  return (
    <div
      style={{
        fontSize: '13px',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <h2>가능한 시간을 클릭해주세요!</h2>
      <HeatMap
        xLabels={xLabels}
        yLabels={yLabels}
        xLabelsLocation="top"
        xLabelWidth={60}
        yLabelWidth={30}
        data={data}
        onClick={(x, y) => handleClick(x, y)}
        cellStyle={(background, value, min, max, data, x, y) => ({
          background: value ? '#81F781' : 'white',
          fontSize: '11.5px',
          color: '#444',
          border: '1px solid #e0e0e0',
        })}
        cellRender={(value) => <div style={{ height: '30px' }}></div>}
        square={true}
        xLabelsElement={(index, value) => (
          <div style={{ fontSize: '11px', lineHeight: '1.2' }}>
            {value.split('\n').map((part, i) => (
              <div key={i}>{part}</div>
            ))}
          </div>
        )}
      />
    </div>
  );
}
