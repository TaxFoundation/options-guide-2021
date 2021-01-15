import React from 'react';
import OptionSelect from './OptionSelect';

const Navigation = ({ options, setOption }) => {
  return (
    <div>
      <h1>Options for Reforming America's Tax Code</h1>
      <OptionSelect options={options} setOption={setOption}></OptionSelect>
    </div>
  );
};

export default Navigation;
