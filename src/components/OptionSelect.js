import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #0094ff;
  border: 1px solid #0094ff;
  border-radius: 4px;
  padding: 1rem;
`;

const OptionSelect = ({ options, setOption }) => {
  return (
    <Container>
      <h2>Choose a Tax Reform Option</h2>
      <select name="option-select" id="option-select" onChange={e => setOption(e.target.value)}>
        <option value="home">Options for Tax Reform Home Page</option>
        {options.map(option => (
          <option value={option.id}>{`Option ${option.id}: ${option.title}`}</option>
        ))}
      </select>
    </Container>
  );
};

export default OptionSelect;
