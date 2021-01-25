import React from 'react';
import styled from 'styled-components';

const Effects = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
`;

const EffectStatistic = styled.span`
  color: var(--tf-blue);
  display: block;
  font-size: 1.2rem;
`;

const Table = ({ data }) => {
  return (
    <div>
      <Effects>
        <div>
          <h3>Economic Effects</h3>
          <p>
            <EffectStatistic>{data.longRunEconomic.gdp}</EffectStatistic> Long-Run Change in GDP
          </p>
          <p>
            <EffectStatistic>{data.longRunEconomic.fullTimeEquivalentJobs}</EffectStatistic>{' '}
            Full-Time Equivalent Jobs
          </p>
        </div>
        <div>
          <h3>Budgetary Effects</h3>
          <p>
            <EffectStatistic>{data.conventionalRevenue.total}</EffectStatistic> Static 10-Year
            Revenue
          </p>
          <p>
            <EffectStatistic>{data.dynamicRevenue.total}</EffectStatistic> Dynamic 10-Year Revenue
          </p>
        </div>
      </Effects>
      <table>
        <thead>
          <tr>
            <th>Income Group</th>
            <th>Static % Change in After-Tax Income</th>
            <th>Dynamic % Change in After Tax Income</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0% to 20%</td>
            <td>{data['2030ConventionalDistribution']['0To20']}</td>
            <td>{data.longRunDynamicDistribution['0To20']}</td>
          </tr>
          <tr>
            <td>20% to 40%</td>
            <td>{data['2030ConventionalDistribution']['20To40']}</td>
            <td>{data.longRunDynamicDistribution['20To40']}</td>
          </tr>
          <tr>
            <td>40% to 60%</td>
            <td>{data['2030ConventionalDistribution']['40To60']}</td>
            <td>{data.longRunDynamicDistribution['40To60']}</td>
          </tr>
          <tr>
            <td>60% to 80%</td>
            <td>{data['2030ConventionalDistribution']['60To80']}</td>
            <td>{data.longRunDynamicDistribution['60To80']}</td>
          </tr>
          <tr>
            <td>80% to 100%</td>
            <td>{data['2030ConventionalDistribution']['80To100']}</td>
            <td>{data.longRunDynamicDistribution['80To100']}</td>
          </tr>
          <tr>
            <td>90% to 100%</td>
            <td>{data['2030ConventionalDistribution']['90To100']}</td>
            <td>{data.longRunDynamicDistribution['90To100']}</td>
          </tr>
          <tr>
            <td>99% to 100%</td>
            <td>{data['2030ConventionalDistribution']['99To100']}</td>
            <td>{data.longRunDynamicDistribution['99To100']}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{data['2030ConventionalDistribution'].total}</td>
            <td>{data.longRunDynamicDistribution.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
