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

const Option = ({ option }) => {
  const [subOption, setSubOption] = useState(option.data[0]);
  let graphData = filterOutTotal(subOption.conventionalRevenue).map((d, i) => {
    return {
      year: d.year,
      conventional: d.value,
      dynamic: filterOutTotal(subOption.dynamicRevenue).find(
        r => r.year === d.year,
      ).value,
    };
  });

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
            option.data.map(d => (
              <button
                onClick={() => {
                  setSubOption(option.data.find(o => o.name === d.name));
                }}
              >
                {d.name}
              </button>
            ))}
        </div>
        <Graph data={graphData}></Graph>
        <SummaryData data={subOption}></SummaryData>
      </DataContainer>
      <div dangerouslySetInnerHTML={{ __html: option.text }}></div>
      <HR />
    </div>
  );
};

export default Option;
