import React from 'react';

import NumericTableCell from './NumericTableCell';

const Comparison = ({ options }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Tax Reform Option</th>
          <th>Long-Run Change in GDP</th>
          <th>Full-Time Equivalent Jobs</th>
          <th>Static 10-Year Revenue (billions)</th>
          <th>Dynamic 10-Year Revenue (billions)</th>
        </tr>
      </thead>
      <tbody>
        {options.map(option => (
          <tr key={`option-table-${option.id}`}>
            <td>
              <span>Option {option.id}</span>: {option.title}
            </td>
            <NumericTableCell>{option.longRunGDP}</NumericTableCell>
            <NumericTableCell>{option.fteJobs}</NumericTableCell>
            <NumericTableCell>{option.static10YearRev}</NumericTableCell>
            <NumericTableCell>{option.dynamic10YearRev}</NumericTableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Comparison;
