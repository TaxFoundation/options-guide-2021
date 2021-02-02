import React from 'react';
import styled from 'styled-components';
import { LinePath } from '@vx/shape';
import { scaleLinear } from '@vx/scale';
import { Axis, AxisLeft } from '@vx/axis';
import { ScaleSVG } from '@vx/responsive';

const Graph = ({ conventional, dynamic }) => {
  const width = 600;
  const height = 540;
  const margin = {
    bottom: 40,
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

  return (
    <div>
      <ScaleSVG width={width} height={height}>
        <AxisLeft
          label="Change in Government Revenue (Billions)"
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
    </div>
  );
};

export default Graph;
