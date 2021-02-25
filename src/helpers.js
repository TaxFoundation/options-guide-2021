const dollarFormat = number =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);

const percentFormat = number =>
  `${new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(number * 100)}%`;

export { dollarFormat, percentFormat };
