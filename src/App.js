import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

import { useQueryParams } from './helpers';
import Navigation from './components/Navigation';
import Home from './components/Home';
import OptionLayout from './components/OptionLayout';
import Comparison from './components/Comparison';

import options from './data/cleaned/data.json';

const GlobalStyle = createGlobalStyle`
  :root {
    --tf-blue: hsl(205, 100%, 50%);
    --tf-blue-light: hsl(205, 100%, 90%);
    --gray: #ccc;
  }

  .options-guide-interactive {
    font-family: Lato, sans-serif;
  }
`;

function App() {
  const [option, setOption] = useQueryParams('option', 'home');
  const [optionData, setOptionData] = useState(null);

  const comparisonData = [];
  options.forEach(option => {
    option.data.forEach(data => {
      comparisonData.push({
        id: option.id,
        title:
          option.data.length === 1
            ? `${option.id}: ${option.title}`
            : `${option.id}: ${option.title} - ${data.name}`,
        longRunGDP: data.longRunEconomic.gdp,
        fteJobs: data.longRunEconomic.fullTimeEquivalentJobs,
        static10YearRev: data.conventionalRevenue.total,
        dynamic10YearRev: data.dynamicRevenue.total,
      });
    });
  });

  useEffect(() => {
    if (option !== 'home') {
      setOptionData(options.find(opt => +opt.id === +option));
    } else {
      setOptionData(null);
    }
  }, [option]);

  return (
    <div className="options-guide-interactive">
      <GlobalStyle />
      <Navigation option={option} options={options} setOption={setOption} />
      {option === 'home' && <Home />}
      {option !== 'home' && optionData && <OptionLayout option={optionData} />}
      <Comparison
        current={option}
        options={comparisonData}
        setOption={setOption}
      />
    </div>
  );
}

export default App;
