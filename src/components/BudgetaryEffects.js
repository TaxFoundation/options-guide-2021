import React, { useState } from 'react';
import styled from 'styled-components';

import { Effect, EffectsList, EffectStatistic } from './Effects';
import Tooltip, { CloseIcon, QuestionIcon } from './Tooltip';
import { dollarFormat } from '../helpers';

const BudgetaryEffects = ({ conventional, dynamic }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const tooltipMouseEnter = (x, y) => {
    if (!showTooltip) setShowTooltip(true);
    setTooltipPosition({ x, y });
  };

  const tooltipMouseout = () => {
    if (showTooltip) setShowTooltip(false);
    setTooltipPosition({ x: 0, y: 0 });
  };

  return (
    <>
      <Effect>
        <h3>
          Budgetary Effects
          {showTooltip ? (
            <CloseIcon
              onClick={() => {
                tooltipMouseout();
              }}
            />
          ) : (
            <QuestionIcon
              onClick={e => {
                tooltipMouseEnter(e.clientX, e.clientY);
              }}
            />
          )}
        </h3>
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
      <Tooltip show={showTooltip} x={tooltipPosition.x} y={tooltipPosition.y}>
        <div>
          Warning: Readers should not attempt to combine the revenue, economic,
          or distributional figures from multiple options. The U.S. tax system
          contains many components which interact with each other in complex
          ways. Learn more by downloading the PDF and referencing the "How to
          Use This Book" section.
        </div>
      </Tooltip>
    </>
  );
};

export default BudgetaryEffects;
