import React from 'react';
import styled from 'styled-components';

import { Effects } from './Effects';
import BudgetaryEffects from './BudgetaryEffects';
import EconomicEffects from './EconomicEffects';
import DistributionTable from './DistributionTable';

const Container = styled.div`
  display: grid;
  grid-template: repeat(2, auto) / 1fr;
`;

const Table = ({ data }) => {
  return (
    <Container>
      <Effects>
        <BudgetaryEffects
          conventional={data.conventionalRevenue.total}
          dynamic={data.dynamicRevenue.total}
        />
        <EconomicEffects econEffects={data.longRunEconomic} />
      </Effects>
      <DistributionTable
        nextYear={data['2022ConventionalDistribution']}
        finalYear={data['2031ConventionalDistribution']}
        distribution={data.longRunDynamicDistribution}
      />
    </Container>
  );
};

export default Table;
