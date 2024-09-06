import React from 'react';
import styled from 'styled-components';

const LinksContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  justify-content: center;
  grid-template: auto / repeat(2, auto);
`;

const Link = styled.a`
  background-color: ${props => (props.bg ? props.bg : '#0094ff')};
  border: 1px solid ${props => (props.bg ? props.bg : '#0094ff')};
  border-radius: 4px;
  color: #fff;
  padding: 0.5rem 1rem;
  text-decoration: none;

  &:visited,
  &:hover,
  &:focus {
    color: #fff;
  }
`;

const Contact = ({ downloadUrl }) => {
  return (
    <div>
    </div>
  );
};

export default Contact;
