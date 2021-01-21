import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';

import options from './data/cleaned/data.json';

function App() {
  // todo set option state according to pae query val
  const [option, setOption] = useState('home');
  const [optionData, setOptionData] = useState({});

  useEffect(() => {
    // todo fetch option data on request
    if (option !== 'home') {
      setOptionData(options.find(opt => opt.id === option));
    } else {
      setOptionData({});
    }
  }, [option]);

  return (
    <div>
      <Navigation options={options} setOption={setOption}></Navigation>
      <div>{JSON.stringify(optionData)}</div>
    </div>
  );
}

export default App;
