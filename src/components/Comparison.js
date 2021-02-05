import React, { useState } from 'react';
import styled from 'styled-components';

import NumericTableCell from './NumericTableCell';

const TH = styled.th`
  cursor: pointer;
`;

const Comparison = ({ current, options }) => {
  const [sortBy, setSortBy] = useState('id');
  const [ascending, setAscending] = useState(true);

  const handleSort = id => {
    if (sortBy !== id) {
      setSortBy(id);
      setAscending(true);
    } else {
      setAscending(!ascending);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <TH onClick={() => handleSort('id')}>Tax Reform Option</TH>
          <TH onClick={() => handleSort('gdp')}>Long-Run Change in GDP</TH>
          <TH onClick={() => handleSort('fte')}>Full-Time Equivalent Jobs</TH>
          <TH onClick={() => handleSort('static')}>Static 10-Year Revenue (billions)</TH>
          <TH onClick={() => handleSort('dynamic')}>Dynamic 10-Year Revenue (billions)</TH>
        </tr>
      </thead>
      <tbody>
        {options
          .sort((a, b) => {
            switch (sortBy) {
              case 'gdp':
                return ascending ? a.longRunGDP - b.longRunGDP : b.longRunGDP - a.longRunGDP;
              case 'fte':
                return ascending ? a.fteJobs - b.fteJobs : b.fteJobs - a.fteJobs;
              case 'static':
                return ascending
                  ? a.static10YearRev - b.static10YearRev
                  : b.static10YearRev - a.static10YearRev;
              case 'dynamic':
                return ascending
                  ? a.dynamic10YearRev - b.dynamic10YearRev
                  : b.dynamic10YearRev - a.dynamic10YearRev;
              default:
                return ascending ? a.id - b.id : b.id - a.id;
            }
          })
          .map(option => (
            <tr key={`option-table-${option.id}`}>
              <td>{`Option ${option.id}: ${option.title}`}</td>
              <NumericTableCell>{`${option.longRunGDP * 100}%`}</NumericTableCell>
              <NumericTableCell>{new Intl.NumberFormat().format(option.fteJobs)}</NumericTableCell>
              <NumericTableCell>
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                  option.static10YearRev,
                )}
              </NumericTableCell>
              <NumericTableCell>
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                  option.dynamic10YearRev,
                )}
              </NumericTableCell>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Comparison;
