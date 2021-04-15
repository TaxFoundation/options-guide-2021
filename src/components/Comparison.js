import React, { useState } from 'react';
import styled from 'styled-components';

import NumericTableCell from './NumericTableCell';
import { wholeNumberFormat, percentToText, dollarFormat } from '../helpers';

const Container = styled.div`
  @media screen and (min-width: 1024px) {
    width: 94vw !important;
    position: relative !important;
    left: 50% !important;
    right: 50% !important;
    margin-left: -47vw !important;
    margin-right: -47vw !important;
    max-width: 94vw !important;
    table {
      display: table !important;
    }
  }
`;

const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  position: relative;

  th,
  td {
    border: 1px solid #ccc;
    padding: 0.25rem;
  }
`;

const TH = styled.th`
  background-color: #fff;
  background-clip: padding-box;
  box-shadow: 0 1px 0 0 #ccc;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  position: sticky;
  top: 0;
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

const TD = styled(NumericTableCell)`
  font-size: 0.8rem;
`;

const OptionLink = styled.td`
  color: var(--tf-blue);
  cursor: pointer;
  font-size: 0.9rem;
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
    <Container id="comparison">
      <h2 style={{ textAlign: 'center' }}>Options Comparison Table</h2>
      <Table>
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
                <TD>{percentToText(option.longRunGDP)}</TD>
                <TD>{wholeNumberFormat(option.fteJobs)}</TD>
                <TD>{dollarFormat(option.static10YearRev)}</TD>
                <TD>{dollarFormat(option.dynamic10YearRev)}</TD>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Comparison;
