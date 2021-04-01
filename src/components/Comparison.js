import React, { useState } from 'react';
import styled from 'styled-components';

import NumericTableCell from './NumericTableCell';
import { wholeNumberFormat, percentFormat, dollarFormat } from '../helpers';

const TH = styled.th`
  background-color: white !important;
  cursor: pointer;
  font-weight: 700;
  text-align: center;
  transition: 0.2s ease-in-out background-color;

  &:hover {
    background-color: var(--tf-blue-light) !important;
  }

  div {
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;

    @media screen and (min-width: 500px) {
      padding-right: 0.5rem;
      position: relative;

      &::after,
      &::before {
        border: 4px solid transparent;
        content: '';
        display: block;
        height: 0;
        right: 0;
        top: 50%;
        position: absolute;
        width: 0;
      }

      &::before {
        border-bottom-color: ${props => props.colors.upColor};
        margin-top: -9px;
      }

      &::after {
        border-top-color: ${props => props.colors.downColor};
        margin-top: 1px;
      }
    }
  }
`;

const OptionLink = styled.td`
  color: var(--tf-blue);
  cursor: pointer;
`;

const Comparison = ({ current, options, setOption }) => {
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

  const sortArrows = (id, sortBy, ascending) => {
    return {
      upColor: id === sortBy && ascending ? 'var(--tf-blue)' : 'var(--gray)',
      downColor: id === sortBy && !ascending ? 'var(--tf-blue)' : 'var(--gray)',
    };
  };

  return (
    <table>
      <thead>
        <tr>
          <TH
            colors={sortArrows('id', sortBy, ascending)}
            onClick={() => handleSort('id')}
          >
            <div>Tax Reform Option</div>
          </TH>
          <TH
            colors={sortArrows('gdp', sortBy, ascending)}
            onClick={() => handleSort('gdp')}
          >
            <div>Long-Run Change in GDP</div>
          </TH>
          <TH
            colors={sortArrows('fte', sortBy, ascending)}
            onClick={() => handleSort('fte')}
          >
            <div>Full-Time Equivalent Jobs</div>
          </TH>
          <TH
            colors={sortArrows('static', sortBy, ascending)}
            onClick={() => handleSort('static')}
          >
            <div>Static 10-Year Revenue (billions)</div>
          </TH>
          <TH
            colors={sortArrows('dynamic', sortBy, ascending)}
            onClick={() => handleSort('dynamic')}
          >
            <div>Dynamic 10-Year Revenue (billions)</div>
          </TH>
        </tr>
      </thead>
      <tbody>
        {options
          .sort((a, b) => {
            switch (sortBy) {
              case 'gdp':
                return ascending
                  ? a.longRunGDP - b.longRunGDP
                  : b.longRunGDP - a.longRunGDP;
              case 'fte':
                return ascending
                  ? a.fteJobs - b.fteJobs
                  : b.fteJobs - a.fteJobs;
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
          .map((option, i) => (
            <tr key={`option-table-${option.id}-${i}`}>
              <OptionLink
                onClick={() => {
                  setOption(option.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {option.title}
              </OptionLink>
              <NumericTableCell>
                {percentFormat(option.longRunGDP)}
              </NumericTableCell>
              <NumericTableCell>
                {wholeNumberFormat(option.fteJobs)}
              </NumericTableCell>
              <NumericTableCell>
                {dollarFormat(option.static10YearRev)}
              </NumericTableCell>
              <NumericTableCell>
                {dollarFormat(option.dynamic10YearRev)}
              </NumericTableCell>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Comparison;
