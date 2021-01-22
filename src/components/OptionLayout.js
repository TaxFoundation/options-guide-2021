import React from 'react';

import HR from './HR';

const Option = ({ option }) => {
  return (
    <div>
      <h2>{option.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: option.text }}></div>
      <HR />
      {/* TODO: sections with data */}
    </div>
  );
};

export default Option;
