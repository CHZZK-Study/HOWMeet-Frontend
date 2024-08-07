import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { ResultHeatmapProps } from '@/types/ResultHeatmap';

function ResultGraph({
  selectedTimeSlots,
}: {
  selectedTimeSlots: ResultHeatmapProps[];
}) {
  const chartRef = useRef(null);
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    if (selectedTimeSlots.length > 0) {
      const processed = processData(selectedTimeSlots[0]);
      setProcessedData(processed);
    }
  }, [selectedTimeSlots]);

  useEffect(() => {
    if (chartRef.current && processedData.length > 0) {
      createGraph();
    }
  }, [processedData]);

  const processData = (data) => {
    const timeSlots = data.selectTime.sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    );
    const mergedSlots = [];
    let currentSlot = null;

    for (const slot of timeSlots) {
      if (!currentSlot || !arraysEqual(currentSlot.users, slot.users)) {
        if (currentSlot) {
          mergedSlots.push(currentSlot);
        }
        currentSlot = { ...slot, endTime: addMinutes(new Date(slot.time), 30) };
      } else {
        currentSlot.endTime = addMinutes(new Date(slot.time), 30);
        currentSlot.userCount = Math.max(currentSlot.userCount, slot.userCount);
      }
    }
    if (currentSlot) {
      mergedSlots.push(currentSlot);
    }

    return mergedSlots
      .map((slot) => ({
        ...slot,
        duration: (slot.endTime - new Date(slot.time)) / (1000 * 60),
        score:
          slot.userCount * ((slot.endTime - new Date(slot.time)) / (1000 * 60)),
      }))
      .sort((a, b) => b.score - a.score)
      .map((slot, index) => ({ ...slot, rank: index + 1 }));
  };

  const createGraph = () => {
    d3.select(chartRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 200 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(processedData, (d) => d.score)])
      .range([0, width]);

    const y = d3
      .scaleBand()
      .domain(
        processedData.map(
          (d) => `${formatDate(d.time)} - ${formatDate(d.endTime)}`
        )
      )
      .range([0, height])
      .padding(0.1);

    svg
      .selectAll('rect')
      .data(processedData)
      .enter()
      .append('rect')
      .attr('y', (d) => y(`${formatDate(d.time)} - ${formatDate(d.endTime)}`))
      .attr('width', (d) => x(d.score))
      .attr('height', y.bandwidth())
      .attr('fill', (d) =>
        d3.interpolateGreens(1 - (d.rank - 1) / processedData.length)
      )
      .attr('rx', 5)
      .on('mouseover', function (event, d) {
        showTooltip(event, d, svg);
      })
      .on('mouseout', hideTooltip);

    svg
      .append('g')
      .call(d3.axisLeft(y).tickSize(0))
      .call((g) => g.select('.domain').remove());

    svg
      .selectAll('.value')
      .data(processedData)
      .enter()
      .append('text')
      .attr('class', 'value')
      .attr('x', (d) => x(d.score) - 5)
      .attr(
        'y',
        (d) =>
          y(`${formatDate(d.time)} - ${formatDate(d.endTime)}`) +
          y.bandwidth() / 2
      )
      .attr('dy', '.35em')
      .attr('text-anchor', 'end')
      .text((d) => `${d.userCount}명`)
      .attr('fill', 'white');
  };

  const showTooltip = (event, d, svg) => {
    const tooltip = svg
      .append('g')
      .attr('class', 'tooltip')
      .attr('transform', `translate(${event.offsetX},${event.offsetY - 10})`);

    tooltip
      .append('rect')
      .attr('width', 200)
      .attr('height', 60)
      .attr('fill', 'white')
      .attr('stroke', 'black');

    tooltip
      .append('text')
      .attr('x', 10)
      .attr('y', 20)
      .text(`시간: ${formatDate(d.time)} - ${formatDate(d.endTime)}`);

    tooltip
      .append('text')
      .attr('x', 10)
      .attr('y', 40)
      .text(`참여자: ${d.users.join(', ')}`);
  };

  const hideTooltip = () => {
    d3.select('.tooltip').remove();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes * 60000);
  };

  const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  return <div ref={chartRef} />;
}

export default ResultGraph;
