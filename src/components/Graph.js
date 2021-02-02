import React from 'react';
import styled from 'styled-components';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { scaleLinear } from '@vx/scale';
import { curveMonotoneX } from '@vx/curve';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { ScaleSVG } from '@vx/responsive';

const Container = styled.div`
  border: 1px solid var(--gray);
`;

const Graph = ({ conventional, dynamic }) => {
  const width = 600;
  const height = 500;
  const margin = {
    bottom: 40,
    left: 40,
    right: 20,
    top: 20,
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

  return (
    <Container>
      <ScaleSVG width={width} height={height}>
        <AxisLeft
          left={margin.left}
          scale={yScale}
          tickFormat={v => (+v < 0 ? `-$${Math.abs(v)}` : `$${+v}`)}
          top={margin.top}
        ></AxisLeft>
        <AxisBottom
          labelOffset={min <= 0 ? 10 : 0}
          left={margin.left}
          scale={xScale}
          top={yScale(0) + margin.top}
          tickFormat={v => v}
        ></AxisBottom>
        <LinePath
          data={conventional}
          x={d => xScale(d.year) + margin.left}
          y={d => yScale(d.value) + margin.top}
          stroke="#000"
          strokeWidth={3}
        ></LinePath>
        <LinePath
          data={dynamic}
          x={d => xScale(d.year) + margin.left}
          y={d => yScale(d.value) + margin.top}
          stroke="#000"
          strokeWidth={3}
        ></LinePath>
      </ScaleSVG>
    </Container>
  );
};

export default Graph;
