import React from 'react';
import styled from 'styled-components';

const TooltipIcon = styled.span`
  border: 1px solid var(--tf-blue);
  border-radius: 4px;
  color: var(--tf-blue);
  cursor: pointer;
  display: inline-block;
  font-size: 0.9rem;
  height: 18px;
  margin: -0.5rem 0 0 1.5rem;
  padding: 6px;
  width: 18px;

  &:hover {
    background-color: var(--tf-blue-light);
  }
`;

const StyledTooltip = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 1px 1px 2px -2px #333;
  color: #333;
  display: ${props => (props.show ? 'block' : 'none')};
  font-family: 'Lato', sans-serif;
  line-height: 1.4rem;
  padding: 1rem;
  position: fixed;
  text-align: initial;
  width: 400px;
  z-index: 1000;
`;

const Tooltip = ({ show, children, x, y }) => {
  return (
    <StyledTooltip
      show={show}
      style={{
        top: show ? `${y - 200}px` : 0,
        left: show ? `${x - 300}px` : 0,
      }}
    >
      {children}
    </StyledTooltip>
  );
};

export { Tooltip as default, TooltipIcon };
