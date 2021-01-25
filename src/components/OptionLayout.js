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
  grid-template-areas:
    'graphs'
    'tables';

  @media (min-width: 780px) {
    grid-template-areas: 'graphs' 'tables';
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Option = ({ option }) => {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>
        <OptionNumber>Option {option.id}</OptionNumber>
        {option.title}
      </h2>
      {/* TODO: sections with data */}
      <DataContainer>
        <Graph data={option.data}></Graph>
        <Table data={option.data}></Table>
      </DataContainer>
      <div dangerouslySetInnerHTML={{ __html: option.text }}></div>
      <HR />
    </div>
  );
};

export default Option;
