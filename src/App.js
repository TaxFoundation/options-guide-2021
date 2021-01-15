import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';

function App() {
  // todo set option state according to pae query val
  const [option, setOption] = useState('home');
  const [optionData, setOptionData] = useState(null);
  const options = [
    { id: 1, title: 'Do a tax thing' },
    { id: 2, title: 'Create a tax on taxes' },
    { id: 3, title: 'Tax the Rich, but also the Middle Class and Poor' },
  ];

  useEffect(() => {
    // todo fetch option data on request
    setOptionData('test');
  }, [option]);

  return (
    <div>
      <Navigation options={options} setOption={setOption}></Navigation>
    </div>
  );
}

export default App;
