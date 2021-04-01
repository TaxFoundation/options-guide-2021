import React, { useState } from 'react';
import styled from 'styled-components';

import HR from './HR';
import Graph from './Graph';
import SummaryData from './SummaryData';

const OptionNumber = styled.span`
  color: var(--tf-blue);
  display: block;
  font-size: 1.2rem;
  text-transform: uppercase;
`;

const DataContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template: repeat(2, auto) / 1fr;
`;

const filterOutTotal = obj => {
  return Object.keys(obj)
    .filter(key => key !== 'total')
    .map(key => {
      return { year: +key, value: +obj[key] };
    });
};

const generateGraphData = data => {
  return filterOutTotal(data.conventionalRevenue).map((d, i) => {
    return {
      year: d.year,
      conventional: d.value,
      dynamic: filterOutTotal(data.dynamicRevenue).find(r => r.year === d.year)
        .value,
    };
  });
};

const Option = ({ option }) => {
  const [subOption, setSubOption] = useState(0);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>
        <OptionNumber>Option {option.id}</OptionNumber>
        {option.title}
      </h2>
      {/* TODO: sections with data */}
      <DataContainer>
        <div>
          {option.data.length > 1 &&
            option.data.map((d, i) => (
              <button
                onClick={() => {
                  setSubOption(i);
                }}
              >
                {d.name}
              </button>
            ))}
        </div>
        <Graph data={generateGraphData(option.data[subOption])}></Graph>
        <SummaryData data={option.data[subOption]}></SummaryData>
      </DataContainer>
      <div dangerouslySetInnerHTML={{ __html: option.text }}></div>
      <HR />
    </div>
  );
};

export default Option;
