import React from 'react';
import styled from 'styled-components';

import NumericTableCell from './NumericTableCell';
import { percentToText } from '../helpers';

const StyledTable = styled.table`
  --normal-highlight: hsl(205, 100%, 95%);
  --rich-highlight: hsl(255, 100%, 95%);

  border: 1px solid #ccc;
  border-collapse: collapse;

  td,
  th {
    padding: 0.25rem;
  }

  thead th {
    border: 1px solid #ccc;
    font-size: 0.9rem;
  }

  tbody tr td {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    font-size: 0.9rem;
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
      'linear-gradient(90deg, #fafafa 0%, #fafafa 20%, var(--normal-highlight) 20%, var(--normal-highlight) 40%, #fefefe 40%, #fefefe 100%)',
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
          <th rowSpan="2">Income Group</th>
          <th colSpan="3">Percent Change in After Tax Income</th>
        </tr>
        <tr>
          <th>Conventional, 2022</th>
          <th>Conventional, 2031</th>
          <th>Long Run Dynamic</th>
        </tr>
      </thead>
      <tbody>
        {distributions.map(dist => (
          <tr
            key={dist.id}
            style={{
              backgroundImage: dist.bg,
            }}
          >
            <td>{dist.name}</td>
            <NumericTableCell>
              {percentToText(nextYear[dist.id])}
            </NumericTableCell>
            <NumericTableCell>
              {percentToText(finalYear[dist.id])}
            </NumericTableCell>
            <NumericTableCell>
              {percentToText(distribution[dist.id])}
            </NumericTableCell>
          </tr>
        ))}

        <tr style={{ backgroundColor: 'transparent', fontWeight: 700 }}>
          <td>Total</td>
          <NumericTableCell>{percentToText(nextYear.total)}</NumericTableCell>
          <NumericTableCell>{percentToText(finalYear.total)}</NumericTableCell>
          <NumericTableCell>
            {percentToText(distribution.total)}
          </NumericTableCell>
        </tr>
      </tbody>
    </StyledTable>
  );
};

export default DistributionTable;
