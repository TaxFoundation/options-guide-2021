import React from 'react';

const Option = ({ option }) => {
  return (
    <div>
      <h2>{option.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: option.text }}></div>
    </div>
  );
};

export default Option;
