import React from 'react';
import styled from 'styled-components';

const SVGIcon = styled.svg`
  cursor: pointer;
  height: 22px;
  width: 22px;
`;

const CloseIcon = ({ onClick }) => (
  <SVGIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 22"
    onClick={onClick}
  >
    <path
      d="m117.18 31.592c-5.595-9.586-13.185-17.18-22.771-22.771-9.588-5.595-20.06-8.392-31.408-8.392-11.352 0-21.822 2.797-31.408 8.392-9.587 5.594-17.18 13.184-22.772 22.771-5.596 9.587-8.393 20.06-8.393 31.408 0 11.352 2.798 21.82 8.392 31.408 5.595 9.585 13.185 17.18 22.772 22.771 9.587 5.595 20.06 8.392 31.408 8.392 11.352 0 21.822-2.797 31.408-8.392 9.586-5.594 17.18-13.185 22.771-22.771 5.594-9.587 8.391-20.06 8.391-31.408 0-11.352-2.797-21.822-8.39-31.408m-24.687 46.15c1.032 1.031 1.549 2.255 1.549 3.667 0 1.466-.517 2.716-1.549 3.747l-7.332 7.333c-1.032 1.032-2.281 1.548-3.748 1.548-1.412 0-2.636-.516-3.666-1.548l-14.747-14.747-14.747 14.747c-1.032 1.032-2.254 1.548-3.666 1.548-1.467 0-2.716-.516-3.748-1.548l-7.333-7.333c-1.032-1.031-1.548-2.281-1.548-3.747 0-1.412.516-2.636 1.548-3.667l14.747-14.746-14.747-14.747c-1.032-1.031-1.548-2.254-1.548-3.666 0-1.467.516-2.716 1.548-3.748l7.333-7.332c1.032-1.032 2.281-1.548 3.748-1.548 1.412 0 2.634.516 3.666 1.548l14.747 14.746 14.747-14.746c1.03-1.032 2.254-1.548 3.666-1.548 1.467 0 2.716.516 3.748 1.548l7.332 7.332c1.032 1.032 1.549 2.281 1.549 3.748 0 1.412-.517 2.635-1.549 3.666l-14.746 14.747 14.746 14.746"
      transform="matrix(.12785 0 0 .12785 2.95 2.948)"
      fill="var(--tf-blue)"
    />
  </SVGIcon>
);

const QuestionIcon = ({ onClick }) => (
  <SVGIcon
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 22"
    onClick={onClick}
  >
    <path
      d="M11 3A8 8 0 0 0 3 11 8 8 0 0 0 11 19 8 8 0 0 0 19 11 8 8 0 0 0 11 3M10.994 6.5C11.758 6.5 12.379 6.719 12.857 7.158 13.336 7.589 13.576 8.142 13.576 8.816 13.576 9.109 13.495 9.406 13.336 9.707 13.176 10.01 13.03 10.223 12.908 10.354 12.791 10.475 12.623 10.635 12.404 10.83L12.342 10.891C11.83 11.338 11.572 11.785 11.572 12.232V12.719H10.389V12.146C10.389 11.781 10.469 11.467 10.629 11.207 10.788 10.939 11.07 10.625 11.473 10.268 11.699 10.06 11.859 9.914 11.951 9.816 12.05 9.711 12.148 9.569 12.24 9.391 12.341 9.204 12.393 9.01 12.393 8.816 12.393 8.442 12.266 8.142 12.01 7.914 11.77 7.686 11.431 7.572 10.994 7.572 10.272 7.572 9.776 7.964 9.508 8.744L8.424 8.305C8.6 7.841 8.904 7.426 9.332 7.06 9.769 6.687 10.322 6.5 10.994 6.5M10.98 13.842C11.224 13.842 11.426 13.923 11.586 14.09 11.754 14.249 11.838 14.442 11.838 14.67 11.838 14.898 11.754 15.09 11.586 15.256 11.426 15.418 11.224 15.5 10.98 15.5 10.737 15.5 10.531 15.418 10.363 15.256 10.204 15.09 10.125 14.898 10.125 14.67 10.125 14.442 10.204 14.249 10.363 14.09 10.531 13.923 10.737 13.842 10.98 13.842"
      transform="translate(0-.002)"
      fill="var(--tf-blue)"
      fillRule="evenodd"
    />
  </SVGIcon>
);

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

export { Tooltip as default, CloseIcon, QuestionIcon };
