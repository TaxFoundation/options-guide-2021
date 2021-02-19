import React from 'react';
import styled from 'styled-components';
import { Text } from '@vx/text';
import { LinePath } from '@vx/shape';
import { scaleLinear, scaleOrdinal } from '@vx/scale';
import { Axis, AxisLeft } from '@vx/axis';
import { LegendOrdinal } from '@vx/legend';
import { ScaleSVG } from '@vx/responsive';

const Container = styled.div`
  border: 1px solid var(--gray);
  border-radius: 4px;
  padding: 1rem;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Graph = ({ conventional, dynamic }) => {
  const values = [...conventional.map(d => d.value), ...dynamic.map(d => d.value), 0];
  const years = [...conventional.map(d => d.year), ...dynamic.map(d => d.year)];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const yearMin = Math.min(...years);
  const yearMax = Math.max(...years);

  const width = 600;
  const height = 400;
  const margin = {
    bottom: min < 0 ? 20 : 40,
    left: 70,
    right: 20,
    top: min < 0 ? 40 : 20,
  };

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

  const conColor = '#377eb8';
  const dynColor = '#4daf4a';
  const colorScale = scaleOrdinal({
    domain: ['Conventional', 'Dynamic'],
    range: [conColor, dynColor],
  });

  return (
    <Container>
      <ScaleSVG width={width} height={height}>
        <Text
          dx={(width - margin.left) / 2 + margin.left}
          dy={3}
          style={{ fill: 'rgb(85,85,85)', fontWeight: 700 }}
          textAnchor="middle"
          verticalAnchor="start"
        >
          Change in GDP Over 10 Years (Billions)
        </Text>
        <AxisLeft
          label="Change in GDP (Billions)"
          labelProps={{
            style: { ffill: 'rgb(85, 85, 85)', fontSize: '0.85rem' },
            textAnchor: 'middle',
          }}
          left={margin.left}
          scale={yScale}
          tickFormat={v => (+v < 0 ? `-$${Math.abs(v)}` : `$${+v}`)}
          tickLabelProps={() => {
            return {
              style: { fill: 'rgb(85, 85, 85)', fontSize: '0.7rem', textAnchor: 'end' },
              dy: 4,
              dx: -5,
            };
          }}
          top={margin.top}
        ></AxisLeft>
        <Axis
          label="Year"
          labelOffset={5}
          labelProps={{
            style: {
              fill: 'rgb(85, 85, 85)',
              fontSize: '0.85rem',
            },
            textAnchor: 'middle',
            transform: `translate(0,${min < 0 ? -7 : 7})`,
          }}
          left={margin.left}
          orientation={max === 0 ? 'top' : 'bottom'}
          scale={xScale}
          tickLabelProps={() => {
            return {
              style: { fill: 'rgb(85, 85, 85)', fontSize: '0.7rem', textAnchor: 'middle' },
              dy: min <= 0 ? -3 : 3,
            };
          }}
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
    </Container>
  );
};

export default Graph;
