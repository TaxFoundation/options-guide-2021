import React from 'react';
import styled from 'styled-components';

import NumericTableCell from './NumericTableCell';
import {
  dollarFormat,
  percentFormat,
  percentToText,
  wholeNumberFormat,
} from '../helpers';

const Container = styled.div`
  display: grid;
  grid-template: repeat(2, auto) / 1fr;
`;

const Effects = styled.div`
  display: grid;
  grid-gap: 2rem;
  text-align: center;
`;

const Effect = styled.div`
  border: 1px solid var(--gray);
  border-radius: 4px;
  padding-bottom: 1rem;

  h3 {
    border-bottom: 1px solid var(--gray);
    padding: 0.5rem 0;
  }
`;

const EffectsList = styled.ul`
  display: grid;
  grid-template: auto / repeat(auto-fit, minmax(min(180px, 100%), 1fr));
  grid-gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin: 0;
    padding: 0;
  }
`;

const EffectStatistic = styled.span`
  color: var(--tf-blue);
  display: block;
  font-size: 1.2rem;
`;

const StyledTable = styled.table`
  --normal-highlight: hsl(205, 100%, 95%);
  --rich-highlight: hsl(255, 100%, 95%);

  thead th {
    border: none;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    font-size: 0.8rem;
  }

  tbody tr td {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    font-size: 0.8rem;
  }
`;

const Table = ({ data }) => {
  return (
    <Container>
      <Effects>
        <Effect>
          <h3>Budgetary Effects</h3>
          <EffectsList>
            <li>
              <EffectStatistic>
                {dollarFormat(data.conventionalRevenue.total)} Billion
              </EffectStatistic>{' '}
              Static 10-Year Revenue
            </li>
            <li>
              <EffectStatistic>
                {dollarFormat(data.dynamicRevenue.total)} Billion
              </EffectStatistic>{' '}
              Dynamic 10-Year Revenue
            </li>
          </EffectsList>
        </Effect>
        <Effect>
          <h3>Economic Effects</h3>
          <EffectsList>
            <li>
              <EffectStatistic>
                {percentToText(data.longRunEconomic.gdp)}
              </EffectStatistic>{' '}
              Gross Domestic Product
            </li>
            <li>
              <EffectStatistic>
                {percentToText(data.longRunEconomic.gnp)}
              </EffectStatistic>{' '}
              Gross National Product
            </li>
            <li>
              <EffectStatistic>
                {percentToText(data.longRunEconomic.capitalStock)}
              </EffectStatistic>{' '}
              Capital Stock
            </li>
            <li>
              <EffectStatistic>
                {`
                  ${
                    data.longRunEconomic.fullTimeEquivalentJobs > 0 ? '+' : ''
                  }${wholeNumberFormat(
                  data.longRunEconomic.fullTimeEquivalentJobs / 1000,
                )}${
                  Math.round(data.longRunEconomic.fullTimeEquivalentJobs) === 0
                    ? ''
                    : 'k'
                }`}
              </EffectStatistic>{' '}
              Full-Time Equivalent Jobs
            </li>
            <li>
              <EffectStatistic>
                {percentToText(data.longRunEconomic.wageRate)}
              </EffectStatistic>{' '}
              Wage Rate
            </li>
          </EffectsList>
        </Effect>
      </Effects>
      <StyledTable>
        <thead>
          <tr>
            <th>Income Group</th>
            <th>Conventional % Change in After-Tax Income, 2022</th>
            <th>Conventional % Change in After-Tax Income, 2031</th>
            <th>Dynamic % Change in After Tax Income</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style={{
              backgroundImage:
                'linear-gradient(90deg, var(--normal-highlight) 0%, var(--normal-highlight) 20%, #fefefe 20%, #fefefe 100%)',
            }}
          >
            <td>0% to 20%</td>
            <NumericTableCell>
              {percentFormat(data['2022ConventionalDistribution']['0To20'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data['2031ConventionalDistribution']['0To20'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data.longRunDynamicDistribution['0To20'])}
            </NumericTableCell>
          </tr>
          <tr
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fafafa 0%, #fafafa 20%, var(--normal-highlight) 20%, var(--normal-highlight) 40%, #fefefe 40%, #fefefe 100%)',
            }}
          >
            <td>20% to 40%</td>
            <NumericTableCell>
              {percentFormat(data['2022ConventionalDistribution']['20To40'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data['2031ConventionalDistribution']['20To40'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data.longRunDynamicDistribution['20To40'])}
            </NumericTableCell>
          </tr>
          <tr
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fafafa 0%, #fafafa 40%, var(--normal-highlight) 40%, var(--normal-highlight) 60%, #fefefe 60%, #fefefe 100%)',
            }}
          >
            <td>40% to 60%</td>
            <NumericTableCell>
              {percentFormat(data['2022ConventionalDistribution']['40To60'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data['2031ConventionalDistribution']['40To60'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data.longRunDynamicDistribution['40To60'])}
            </NumericTableCell>
          </tr>
          <tr
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fafafa 0%, #fafafa 60%, var(--normal-highlight) 60%, var(--normal-highlight) 80%, #fefefe 80%, #fefefe 100%)',
            }}
          >
            <td>60% to 80%</td>
            <NumericTableCell>
              {percentFormat(data['2022ConventionalDistribution']['60To80'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data['2031ConventionalDistribution']['60To80'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data.longRunDynamicDistribution['60To80'])}
            </NumericTableCell>
          </tr>
          <tr
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fafafa 0%, #fafafa 80%, var(--normal-highlight) 80%, var(--normal-highlight) 100%, #fefefe 100%, #fefefe 100%)',
            }}
          >
            <td>80% to 100%</td>
            <NumericTableCell>
              {percentFormat(data['2022ConventionalDistribution']['80To100'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data['2031ConventionalDistribution']['80To100'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data.longRunDynamicDistribution['80To100'])}
            </NumericTableCell>
          </tr>
          <tr
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fafafa 0%, #fafafa 90%, var(--rich-highlight) 90%, var(--rich-highlight) 95%, #fefefe 95%, #fefefe 100%)',
            }}
          >
            <td>90% to 95%</td>
            <NumericTableCell>
              {percentFormat(data['2022ConventionalDistribution']['90To95'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data['2031ConventionalDistribution']['90To95'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data.longRunDynamicDistribution['90To95'])}
            </NumericTableCell>
          </tr>
          <tr
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fafafa 0%, #fafafa 95%, var(--rich-highlight) 95%, var(--rich-highlight) 99%, #fefefe 99%, #fefefe 100%)',
            }}
          >
            <td>95% to 99%</td>
            <NumericTableCell>
              {percentFormat(data['2022ConventionalDistribution']['95To99'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data['2031ConventionalDistribution']['95To99'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data.longRunDynamicDistribution['95To99'])}
            </NumericTableCell>
          </tr>
          <tr
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fafafa 0%, #fafafa 99%, var(--rich-highlight) 99%, var(--rich-highlight) 100%, #fefefe 100%, #fefefe 100%)',
            }}
          >
            <td>99% to 100%</td>
            <NumericTableCell>
              {percentFormat(data['2022ConventionalDistribution']['99To100'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data['2031ConventionalDistribution']['99To100'])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data.longRunDynamicDistribution['99To100'])}
            </NumericTableCell>
          </tr>
          <tr style={{ backgroundColor: 'transparent', fontWeight: 700 }}>
            <td>Total</td>
            <NumericTableCell>
              {percentFormat(data['2022ConventionalDistribution'].total)}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data['2031ConventionalDistribution'].total)}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(data.longRunDynamicDistribution.total)}
            </NumericTableCell>
          </tr>
        </tbody>
      </StyledTable>
    </Container>
  );
};

export default Table;
