import React from 'react';

import HR from './HR';
import OptionSelect from './OptionSelect';

const Navigation = ({ options, setOption }) => {
  return (
    <div>
      <OptionSelect options={options} setOption={setOption}></OptionSelect>
      <HR />
    </div>
  );
};

export default Navigation;
