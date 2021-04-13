import React from 'react';

import { Effect, EffectsList, EffectStatistic } from './Effects';
import { percentToText, wholeNumberFormat } from '../helpers';

const EconomicEffects = ({ econEffects }) => {
  return (
    <Effect>
      <h3>Economic Effects</h3>
      <EffectsList>
        <li>
          <EffectStatistic>{percentToText(econEffects.gdp)}</EffectStatistic>{' '}
          Gross Domestic Product
        </li>
        <li>
          <EffectStatistic>{percentToText(econEffects.gnp)}</EffectStatistic>{' '}
          Gross National Product
        </li>
        <li>
          <EffectStatistic>
            {percentToText(econEffects.capitalStock)}
          </EffectStatistic>{' '}
          Capital Stock
        </li>
        <li>
          <EffectStatistic>
            {`
                  ${
                    econEffects.fullTimeEquivalentJobs > 0 ? '+' : ''
                  }${wholeNumberFormat(
              econEffects.fullTimeEquivalentJobs / 1000,
            )}${
              Math.round(econEffects.fullTimeEquivalentJobs) === 0 ? '' : 'k'
            }`}
          </EffectStatistic>{' '}
          Full-Time Equivalent Jobs
        </li>
        <li>
          <EffectStatistic>
            {percentToText(econEffects.wageRate)}
          </EffectStatistic>{' '}
          Wage Rate
        </li>
      </EffectsList>
    </Effect>
  );
};

export default EconomicEffects;
