import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from './Button';
import HR from './HR';
import Graph from './Graph';
import { Effects } from './Effects';
import BudgetaryEffects from './BudgetaryEffects';
import EconomicEffects from './EconomicEffects';
import DistributionTable from './DistributionTable';

const OptionNumber = styled.span`
  color: var(--tf-blue);
  display: block;
  font-size: 1.2rem;
  text-transform: uppercase;
`;

const SubOptionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
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
  return filterOutTotal(data.conventionalRevenue)
    .sort((a, b) => a.year - b.year)
    .map((d, i) => {
      return {
        year: d.year,
        conventional: d.value,
        dynamic: filterOutTotal(data.dynamicRevenue).find(
          r => r.year === d.year,
        ).value,
      };
    });
};

const Option = ({ option }) => {
  const [subOption, setSubOption] = useState(0);

  useEffect(() => {
    setSubOption(0);
  }, [option]);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>
        <OptionNumber>Option {option.id}</OptionNumber>
        {option.title}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: option.text }}></div>
      <HR />
      <DataContainer>
        <SubOptionButtonsContainer>
          {option.data.length > 1 &&
            option.data.map((d, i) => (
              <Button
                active={i === subOption}
                onClick={() => {
                  setSubOption(i);
                }}
              >
                {d.name}
              </Button>
            ))}
        </SubOptionButtonsContainer>
        {option.data[subOption] && (
          <>
            <Effects>
              <EconomicEffects
                econEffects={option.data[subOption].longRunEconomic}
              />
              <BudgetaryEffects
                conventional={option.data[subOption].conventionalRevenue.total}
                dynamic={option.data[subOption].dynamicRevenue.total}
              />
            </Effects>
            <Graph data={generateGraphData(option.data[subOption])}></Graph>
            <DistributionTable
              nextYear={option.data[subOption]['2022ConventionalDistribution']}
              finalYear={option.data[subOption]['2031ConventionalDistribution']}
              distribution={option.data[subOption].longRunDynamicDistribution}
            />
          </>
        )}
      </DataContainer>
      <HR />
    </div>
  );
};

export default Option;
