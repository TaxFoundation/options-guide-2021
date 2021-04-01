import styled from 'styled-components';

const Button = styled.button`
  background: ${props => (props.active ? '#0094ff' : 'white')};
  border: solid 1px #0094ff;
  color: ${props => (props.active ? 'white' : '#0094ff')};
  cursor: pointer;
  display: inline-block;
  padding: 0.5rem 1rem;
  text-align: center;
  transition-duration: 0.2s;
  transition-property: background-color, border;
  transition-timing-function: ease-out;

  &:active,
  &:focus,
  &:hover {
    background: #33a9ff;
    border: solid 1px #33a9ff;
    color: white;
    text-decoration: none;
  }
`;

export default Button;
