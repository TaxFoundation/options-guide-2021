import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: var(--tf-blue);
  border: 1px solid var(--tf-blue);
  border-radius: 4px;
  color: #fff;
  display: grid;
  grid-gap: 1rem;
  grid-template: repeat(2, 1fr) / auto;
  margin: 0 auto;
  max-width: 800px;
  padding: 1rem;
  text-align: center;
`;

const Heading = styled.h2`
  margin: 0;
`;

const Select = styled.select`
  font-size: 1rem;
  text-align: center;
  width: 100%;
`;

const OptionSelect = ({ options, setOption }) => {
  return (
    <Container>
      <Heading>Choose a Tax Reform Option</Heading>
      <Select name="option-select" id="option-select" onChange={e => setOption(e.target.value)}>
        <option value="home">Options for Tax Reform Home Page</option>
        {options.map(option => (
          <option
            key={`option-${option.id}`}
            value={option.id}
          >{`Option ${option.id}: ${option.title}`}</option>
        ))}
      </Select>
    </Container>
  );
};

export default OptionSelect;
