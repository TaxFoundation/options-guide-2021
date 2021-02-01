import React from 'react';
import styled from 'styled-components';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
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

  const conventionalYears = Object.keys(conventional);
  const dynamicYears = Object.keys(dynamic);
  const conventionalValues = Object.values(conventional);
  const dynamicValues = Object.values(dynamic);

  const min = Math.min(...conventionalValues, ...dynamicValues, 0);
  const max = Math.max(...conventionalValues, ...dynamicValues, 0);

  const yScale = scaleLinear({
    domain: [min, max],
    range: [margin.top, height - margin.top - margin.bottom],
    // nice: true,
  });
  const xScale = scaleTime({
    domain: [
      Math.min(...conventionalYears, ...dynamicYears),
      Math.max(...conventionalYears, ...dynamicYears),
    ],
    range: [0, width - margin.left - margin.right],
    // nice: true,
  });

  console.log(min, max);
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
          left={margin.left}
          scale={xScale}
          top={height - margin.bottom}
          tickFormat={v => v}
        ></AxisBottom>
        <LinePath
          data={Object.keys(conventional).map(key => {
            return { year: key, value: conventional[key] };
          })}
          x={d => +d.year}
          y={d => +d.value}
        ></LinePath>
        <LinePath
          data={Object.keys(dynamic).map(key => {
            return { year: key, value: dynamic[key] };
          })}
          x={d => +d.year}
          y={d => +d.value}
        ></LinePath>
      </ScaleSVG>
    </Container>
  );
};

export default Graph;
