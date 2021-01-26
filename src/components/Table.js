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

const StyledTable = styled.table`
  --normal-highlight: hsl(205, 100%, 97%);
  --rich-highlight: hsl(255, 100%, 97%);

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
      <StyledTable>
        <thead>
          <tr>
            <th>Income Group</th>
            <th>Static % Change in After-Tax Income</th>
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
            <td>{data['2030ConventionalDistribution']['0To20']}</td>
            <td>{data.longRunDynamicDistribution['0To20']}</td>
          </tr>
          <tr
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fefefe 0%, #fefefe 20%, var(--normal-highlight) 20%, var(--normal-highlight) 40%, #fefefe 40%, #fefefe 100%)',
            }}
          >
            <td>20% to 40%</td>
            <td>{data['2030ConventionalDistribution']['20To40']}</td>
            <td>{data.longRunDynamicDistribution['20To40']}</td>
          </tr>
          <tr
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fefefe 0%, #fefefe 40%, var(--normal-highlight) 40%, var(--normal-highlight) 60%, #fefefe 60%, #fefefe 100%)',
            }}
          >
            <td>40% to 60%</td>
            <td>{data['2030ConventionalDistribution']['40To60']}</td>
            <td>{data.longRunDynamicDistribution['40To60']}</td>
          </tr>
          <tr
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fefefe 0%, #fefefe 60%, var(--normal-highlight) 60%, var(--normal-highlight) 80%, #fefefe 80%, #fefefe 100%)',
            }}
          >
            <td>60% to 80%</td>
            <td>{data['2030ConventionalDistribution']['60To80']}</td>
            <td>{data.longRunDynamicDistribution['60To80']}</td>
          </tr>
          <tr
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fefefe 0%, #fefefe 80%, var(--normal-highlight) 80%, var(--normal-highlight) 100%, #fefefe 100%, #fefefe 100%)',
            }}
          >
            <td>80% to 100%</td>
            <td>{data['2030ConventionalDistribution']['80To100']}</td>
            <td>{data.longRunDynamicDistribution['80To100']}</td>
          </tr>
          <tr
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fefefe 0%, #fefefe 90%, var(--rich-highlight) 90%, var(--rich-highlight) 95%, #fefefe 95%, #fefefe 100%)',
            }}
          >
            <td>90% to 95%</td>
            <td>{data['2030ConventionalDistribution']['90To95']}</td>
            <td>{data.longRunDynamicDistribution['90To95']}</td>
          </tr>
          <tr
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fefefe 0%, #fefefe 95%, var(--rich-highlight) 95%, var(--rich-highlight) 99%, #fefefe 99%, #fefefe 100%)',
            }}
          >
            <td>95% to 99%</td>
            <td>{data['2030ConventionalDistribution']['95To99']}</td>
            <td>{data.longRunDynamicDistribution['95To99']}</td>
          </tr>
          <tr
            style={{
              backgroundImage:
                'linear-gradient(90deg, #fefefe 0%, #fefefe 99%, var(--rich-highlight) 99%, var(--rich-highlight) 100%, #fefefe 100%, #fefefe 100%)',
            }}
          >
            <td>99% to 100%</td>
            <td>{data['2030ConventionalDistribution']['99To100']}</td>
            <td>{data.longRunDynamicDistribution['99To100']}</td>
          </tr>
          <tr style={{ backgroundColor: 'transparent', fontWeight: 700 }}>
            <td>Total</td>
            <td>{data['2030ConventionalDistribution'].total}</td>
            <td>{data.longRunDynamicDistribution.total}</td>
          </tr>
        </tbody>
      </StyledTable>
    </div>
  );
};

export default Table;
