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

const SelectContainer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  display: grid;
  align-items: center;
  grid-template-areas: 'select';

  &::after {
    background-color: var(--tf-blue);
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    content: '';
    grid-area: select;
    height: 0.5em;
    justify-self: end;
    margin-right: 0.5rem;
    width: 0.8em;
  }
`;

const Select = styled.select`
  appearance: none;
  background-color: transparent;
  cursor: pointer;
  grid-area: select;
  font-size: 1rem;
  text-align: center;
  width: 100%;
  z-index: 1;
`;

const OptionSelect = ({ option, options, setOption }) => {
  return (
    <Container>
      <Heading>Choose a Tax Reform Option</Heading>
      <SelectContainer>
        <Select
          name="option-select"
          id="option-select"
          value={option}
          onChange={e => setOption(e.target.value)}
        >
          <option value="home">Options for Tax Reform Home Page</option>
          {options.map(option => (
            <option
              key={`option-${option.id}`}
              value={option.id}
            >{`Option ${option.id}: ${option.title}`}</option>
          ))}
        </Select>
      </SelectContainer>
    </Container>
  );
};

export default OptionSelect;
