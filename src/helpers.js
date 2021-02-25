import { useState } from 'react';

const dollarFormat = number =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);

const percentFormat = number =>
  `${new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(number * 100)}%`;

const getQuery = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

const getQueryStringValue = key => getQuery().get(key);

const useQueryParams = (key, defaultVal) => {
  const [query, setQuery] = useState(getQueryStringValue(key) || defaultVal);

  const updateUrl = newVal => {
    setQuery(newVal);

    const query = getQuery();

    if (newVal.trim() !== '') {
      query.set(key, newVal);
    } else {
      query.delete(key);
    }

    // This check is necessary if using the hook with Gatsby
    if (typeof window !== 'undefined') {
      const { protocol, pathname, host } = window.location;
      const newUrl = `${protocol}//${host}${pathname}?${query.toString()}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  return [query, updateUrl];
};

export { dollarFormat, percentFormat, useQueryParams };
