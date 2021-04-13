import React from 'react';
import styled from 'styled-components';

import NumericTableCell from './NumericTableCell';
import { percentFormat } from '../helpers';

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

const distributions = [
  {
    id: '0To20',
    name: '0% to 20%',
    bg:
      'linear-gradient(90deg, var(--normal-highlight) 0%, var(--normal-highlight) 20%, #fefefe 20%, #fefefe 100%)',
  },
  {
    id: '20To40',
    name: '20% to 40%',
    bg:
      'linear-gradient(90deg, #fafafa 0%, #fafafa 40%, var(--normal-highlight) 40%, var(--normal-highlight) 60%, #fefefe 60%, #fefefe 100%)',
  },
  {
    id: '40To60',
    name: '40% to 60%',
    bg:
      'linear-gradient(90deg, #fafafa 0%, #fafafa 40%, var(--normal-highlight) 40%, var(--normal-highlight) 60%, #fefefe 60%, #fefefe 100%)',
  },
  {
    id: '60To80',
    name: '60% to 80%',
    bg:
      'linear-gradient(90deg, #fafafa 0%, #fafafa 60%, var(--normal-highlight) 60%, var(--normal-highlight) 80%, #fefefe 80%, #fefefe 100%)',
  },
  {
    id: '80To100',
    name: '80% to 100%',
    bg:
      'linear-gradient(90deg, #fafafa 0%, #fafafa 80%, var(--normal-highlight) 80%, var(--normal-highlight) 100%, #fefefe 100%, #fefefe 100%)',
  },
  {
    id: '90To95',
    name: '90% to 95%',
    bg:
      'linear-gradient(90deg, #fafafa 0%, #fafafa 90%, var(--rich-highlight) 90%, var(--rich-highlight) 95%, #fefefe 95%, #fefefe 100%)',
  },
  {
    id: '95To99',
    name: '95% to 99%',
    bg:
      'linear-gradient(90deg, #fafafa 0%, #fafafa 95%, var(--rich-highlight) 95%, var(--rich-highlight) 99%, #fefefe 99%, #fefefe 100%)',
  },
  {
    id: '99To100',
    name: '99% to 100%',
    bg:
      'linear-gradient(90deg, #fafafa 0%, #fafafa 99%, var(--rich-highlight) 99%, var(--rich-highlight) 100%, #fefefe 100%, #fefefe 100%)',
  },
];

const DistributionTable = ({ nextYear, finalYear, distribution }) => {
  return (
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
        {distributions.map(dist => (
          <tr
            style={{
              backgroundImage: dist.bg,
            }}
          >
            <td>{dist.name}</td>
            <NumericTableCell>
              {percentFormat(nextYear[dist.id])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(finalYear[dist.id])}
            </NumericTableCell>
            <NumericTableCell>
              {percentFormat(distribution[dist.id])}
            </NumericTableCell>
          </tr>
        ))}

        <tr style={{ backgroundColor: 'transparent', fontWeight: 700 }}>
          <td>Total</td>
          <NumericTableCell>{percentFormat(nextYear.total)}</NumericTableCell>
          <NumericTableCell>{percentFormat(finalYear.total)}</NumericTableCell>
          <NumericTableCell>
            {percentFormat(distribution.total)}
          </NumericTableCell>
        </tr>
      </tbody>
    </StyledTable>
  );
};

export default DistributionTable;
