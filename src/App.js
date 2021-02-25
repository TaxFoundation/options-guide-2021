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
  console.log(useQueryParams);
  const [option, setOption] = useQueryParams('option', 'home');
  const [optionData, setOptionData] = useState(null);

  useEffect(() => {
    if (option !== 'home') {
      setOptionData(options.find(opt => opt.id === option));
    } else {
      setOptionData(null);
    }
  }, [option]);

  return (
    <div className="options-guide-interactive">
      <GlobalStyle />
      <Navigation option={option} options={options} setOption={setOption}></Navigation>
      {option === 'home' && <Home />}
      {option !== 'home' && optionData && <OptionLayout option={optionData} />}
      <Comparison
        current={option}
        options={options.map(opt => {
          return {
            id: opt.id,
            title: opt.title,
            longRunGDP: opt.data.longRunEconomic.gdp,
            fteJobs: opt.data.longRunEconomic.fullTimeEquivalentJobs,
            static10YearRev: opt.data.conventionalRevenue.total,
            dynamic10YearRev: opt.data.dynamicRevenue.total,
          };
        })}
        setOption={setOption}
      ></Comparison>
    </div>
  );
}

export default App;
