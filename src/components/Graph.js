import React from 'react';
import styled from 'styled-components';
import { Text } from '@vx/text';
import { LinePath } from '@vx/shape';
import { scaleLinear, scaleOrdinal } from '@vx/scale';
import { Axis, AxisLeft } from '@vx/axis';
import { LegendOrdinal } from '@vx/legend';
import { ScaleSVG } from '@vx/responsive';

const LegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Graph = ({ conventional, dynamic }) => {
  const width = 600;
  const height = 540;
  const margin = {
    bottom: 50,
    left: 60,
    right: 20,
    top: 30,
  };

  const values = [...conventional.map(d => d.value), ...dynamic.map(d => d.value), 0];
  const years = [...conventional.map(d => d.year), ...dynamic.map(d => d.year)];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const yearMin = Math.min(...years);
  const yearMax = Math.max(...years);

  const yScale = scaleLinear({
    domain: [max, min],
    range: [margin.top, height - margin.top - margin.bottom],
    // nice: true,
  });
  const xScale = scaleLinear({
    domain: [yearMin, yearMax],
    range: [0, width - margin.left - margin.right],
    // nice: true,
  });

  const conColor = '#ff0000';
  const dynColor = '#0000ff';
  const colorScale = scaleOrdinal({
    domain: ['Conventional', 'Dynamic'],
    range: [conColor, dynColor],
  });

  return (
    <div>
      <ScaleSVG width={width} height={height}>
        <Text
          dx={(width - margin.left) / 2 + margin.left}
          dy={0}
          textAnchor="middle"
          verticalAnchor="start"
        >
          Change in GDP Over 10 Years (Billions)
        </Text>
        <AxisLeft
          label="Change in GDP (Billions)"
          left={margin.left}
          scale={yScale}
          tickFormat={v => (+v < 0 ? `-$${Math.abs(v)}` : `$${+v}`)}
          top={margin.top}
        ></AxisLeft>
        <Axis
          label="Year"
          left={margin.left}
          orientation={max === 0 ? 'top' : 'bottom'}
          scale={xScale}
          top={yScale(0) + margin.top}
          tickFormat={v => v}
        ></Axis>
        <LinePath
          data={conventional}
          x={d => xScale(d.year) + margin.left}
          y={d => yScale(d.value) + margin.top}
          stroke={conColor}
          strokeWidth={3}
        ></LinePath>
        <LinePath
          data={dynamic}
          x={d => xScale(d.year) + margin.left}
          y={d => yScale(d.value) + margin.top}
          stroke={dynColor}
          strokeWidth={3}
        ></LinePath>
      </ScaleSVG>
      <LegendContainer>
        <LegendOrdinal scale={colorScale} itemMargin="0 20px" direction="row" />
      </LegendContainer>
    </div>
  );
};

export default Graph;
