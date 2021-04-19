import React, { useState } from 'react';

import { Effect, EffectsList, EffectStatistic } from './Effects';
import Tooltip, { CloseIcon, QuestionIcon } from './Tooltip';
import { percentToText, wholeNumberFormat } from '../helpers';

const EconomicEffects = ({ econEffects }) => {
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
          Economic Effects
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

export default EconomicEffects;
