import React from 'react';

import { Effect, EffectsList, EffectStatistic } from './Effects';
import { dollarFormat } from '../helpers';

const BudgetaryEffects = ({ conventional, dynamic }) => {
  return (
    <Effect>
      <h3>Budgetary Effects</h3>
      <EffectsList>
        <li>
          <EffectStatistic>
            {dollarFormat(conventional)} Billion
          </EffectStatistic>{' '}
          Static 10-Year Revenue
        </li>
        <li>
          <EffectStatistic>{dollarFormat(dynamic)} Billion</EffectStatistic>{' '}
          Dynamic 10-Year Revenue
        </li>
      </EffectsList>
    </Effect>
  );
};

export default BudgetaryEffects;
