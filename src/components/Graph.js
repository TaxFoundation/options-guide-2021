import React from 'react';
import styled from 'styled-components';
import { Text } from '@vx/text';
import { scaleLinear, scaleBand, scaleOrdinal } from '@vx/scale';
import { Axis, AxisLeft } from '@vx/axis';
import { LegendOrdinal } from '@vx/legend';
import { ScaleSVG } from '@vx/responsive';
import { Group } from '@vx/group';

const Container = styled.div`
  border: 1px solid var(--gray);
  border-radius: 4px;
  padding: 1rem;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-transform: capitalize;
`;

const Graph = ({ data }) => {
  const years = [...data.map(d => d.year)];
  const values = [
    ...data.map(d => d.conventional),
    ...data.map(d => d.dynamic),
  ];
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 0);
  const spread = Math.abs(max - min);

  const width = 600;
  const height = 400;
  const margin = {
    bottom: 40,
    left: 70,
    right: 20,
    top: 30,
  };

  const title = 'Change in Government Revenue Over 10 Years (Billions)';
  const keys = ['conventional', 'dynamic'];
  const currencyFormatter = number =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumSignificantDigits: 3,
    }).format(number);

  const yScale = scaleLinear({
    domain: [max + spread * 0.05, min === 0 ? min : min - spread * 0.05],
    range: [0, height - margin.top - margin.bottom],
    // nice: true,
  });
  const yearScale = scaleBand({
    domain: years,
    range: [0, width - margin.left - margin.right],
    round: true,
    padding: 0.2,
  });
  const typeScale = scaleBand({
    domain: keys,
    range: [0, yearScale.bandwidth()],
    round: true,
    padding: 0.1,
  });

  const conColor = '#377eb8';
  const dynColor = '#4daf4a';
  const colorScale = scaleOrdinal({
    domain: keys,
    range: [conColor, dynColor],
  });

  return (
    <Container>
      <ScaleSVG width={width} height={height}>
        <title>{title}</title>
        <Text
          dx={(width - margin.left) / 2 + margin.left}
          dy={3}
          style={{ fill: 'rgb(85,85,85)', fontWeight: 700 }}
          textAnchor="middle"
          verticalAnchor="start"
        >
          {title}
        </Text>
        <line
          x1={margin.left}
          x2={width - margin.right}
          y1={yScale(0) + margin.top}
          y2={yScale(0) + margin.top}
          stroke="rgb(85,85,85)"
        ></line>
        <Group>
          {data.map(y => {
            return (
              <Group
                key={`year-group-${y.year}`}
                left={yearScale(y.year) + margin.left}
                top={margin.top}
              >
                {keys.map((k, i) => {
                  return (
                    <Group key={`${k}-${y.year}`}>
                      <title>{`${currencyFormatter(
                        y[k],
                      )} billion change in Revenue in ${
                        y.year
                      } by ${k} calculations.`}</title>
                      <rect
                        width={typeScale.bandwidth()}
                        fill={colorScale(k)}
                        height={
                          y[k] >= 0
                            ? yScale(0) - yScale(y[k])
                            : yScale(y[k]) - yScale(0)
                        }
                        x={typeScale(k)}
                        y={Math.min(yScale(y[k]), yScale(0))}
                      ></rect>
                    </Group>
                  );
                })}
              </Group>
            );
          })}
        </Group>
        <AxisLeft
          label="Change in Revenue (Billions)"
          labelProps={{
            dx: -5,
            style: { ffill: 'rgb(85, 85, 85)', fontSize: '0.85rem' },
            textAnchor: 'middle',
          }}
          left={margin.left}
          scale={yScale}
          tickFormat={v => (+v < 0 ? `-$${Math.abs(v)}` : `$${+v}`)}
          tickLabelProps={() => {
            return {
              style: {
                fill: 'rgb(85, 85, 85)',
                fontSize: '0.7rem',
                textAnchor: 'end',
              },
              dy: 4,
              dx: -5,
            };
          }}
          top={margin.top}
        ></AxisLeft>
        <Axis
          label="Year"
          labelOffset={18}
          labelProps={{
            style: {
              fill: 'rgb(85, 85, 85)',
              fontSize: '0.85rem',
            },
            textAnchor: 'middle',
          }}
          left={margin.left}
          orientation="bottom"
          scale={yearScale}
          tickLabelProps={() => {
            return {
              style: {
                fill: 'rgb(85, 85, 85)',
                fontSize: '0.7rem',
                textAnchor: 'middle',
              },
              dy: 3,
            };
          }}
          top={height - margin.bottom}
          tickFormat={v => v}
        ></Axis>
      </ScaleSVG>
      <LegendContainer>
        <LegendOrdinal scale={colorScale} itemMargin="0 20px" direction="row" />
      </LegendContainer>
    </Container>
  );
};

export default Graph;
