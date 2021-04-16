import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

import { useQueryParams } from './helpers';
import Chapters from './components/Chapters';
import Navigation from './components/Navigation';
import Home from './components/Home';
import OptionLayout from './components/OptionLayout';
import Comparison from './components/Comparison';
import Contact from './components/Contact';

import options from './data/cleaned/data.json';

const GlobalStyle = createGlobalStyle`
  :root {
    --tf-blue: hsl(205, 100%, 50%);
    --tf-blue-light: hsl(205, 100%, 90%);
    --gray: #ccc;
  }

  .options-guide-interactive {
    font-family: Lato, sans-serif;
    margin: 0 auto;
    max-width: 760px;

    p {
      font-size: 1rem;
      line-height: 1.4;
    }
  }
`;

const downloadUrl = 'https://files.taxfoundation.org/something.pdf';

function App() {
  const [chapter, setChapter] = useState('home');
  const [option, setOption] = useQueryParams('option', 1);
  const [optionData, setOptionData] = useState(null);

  const comparisonData = [];
  options.forEach(option => {
    comparisonData.push({
      id: option.id,
      title:
        option.data.length === 1
          ? `${option.id}: ${option.title}`
          : `${option.id}: ${option.title} (${option.data[0].name})`,
      longRunGDP: option.data[0].longRunEconomic.gdp,
      fteJobs: option.data[0].longRunEconomic.fullTimeEquivalentJobs,
      static10YearRev: option.data[0].conventionalRevenue.total,
      dynamic10YearRev: option.data[0].dynamicRevenue.total,
    });
  });

  useEffect(() => {
    if (option !== 'home') {
      const newOptionData = options.find(opt => +opt.id === +option);
      setChapter(newOptionData.category);
      setOptionData(newOptionData);
    } else {
      setChapter('home');
      setOptionData(null);
    }
  }, [option]);

  return (
    <div className="options-guide-interactive">
      <GlobalStyle />
      <Chapters
        chapter={chapter}
        setChapter={setChapter}
        options={options}
        setOption={setOption}
      />
      <Navigation option={option} options={options} setOption={setOption} />
      {optionData && <OptionLayout option={optionData} />}
      <Comparison
        current={option}
        options={comparisonData}
        setOption={setOption}
      />
      <Contact downloadUrl={downloadUrl} />
    </div>
  );
}

export default App;
