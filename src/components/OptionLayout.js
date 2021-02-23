import React from 'react';
import styled from 'styled-components';

import HR from './HR';
import Graph from './Graph';
import Table from './Table';

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
  let graphData = filterOutTotal(option.data.conventionalRevenue).map((d, i) => {
    return {
      year: d.year,
      conventional: d.value,
      dynamic: filterOutTotal(option.data.dynamicRevenue).find(r => r.year === d.year).value,
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
        <Graph data={graphData}></Graph>
        <Table data={option.data}></Table>
      </DataContainer>
      <div dangerouslySetInnerHTML={{ __html: option.text }}></div>
      <HR />
    </div>
  );
};

export default Option;
