import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

import Navigation from './components/Navigation';
import Home from './components/Home';
import OptionLayout from './components/OptionLayout';

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
  // todo set option state according to pae query val
  const [option, setOption] = useState('home');
  const [optionData, setOptionData] = useState(null);

  useEffect(() => {
    // todo fetch option data on request
    if (option !== 'home') {
      setOptionData(options.find(opt => opt.id === option));
    } else {
      setOptionData(null);
    }
  }, [option]);

  return (
    <div className="options-guide-interactive">
      <GlobalStyle />
      <Navigation options={options} setOption={setOption}></Navigation>
      {option === 'home' && <Home />}
      {option !== 'home' && optionData && <OptionLayout option={optionData} />}
    </div>
  );
}

export default App;
