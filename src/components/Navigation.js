import React from 'react';

import HR from './HR';
import OptionSelect from './OptionSelect';

const Navigation = ({ option, options, setOption }) => {
  return (
    <div>
      <OptionSelect option={option} options={options} setOption={setOption}></OptionSelect>
      <HR />
    </div>
  );
};

export default Navigation;
