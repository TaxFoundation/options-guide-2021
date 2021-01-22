import React from 'react';

import HR from './HR';
import OptionSelect from './OptionSelect';

const Navigation = ({ options, setOption }) => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Options for Reforming America's Tax Code</h1>
      <OptionSelect options={options} setOption={setOption}></OptionSelect>
      <HR />
    </div>
  );
};

export default Navigation;
