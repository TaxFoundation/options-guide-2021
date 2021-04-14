import { useState } from 'react';

const wholeNumberFormat = number =>
  Math.round(number) === 0
    ? 0
    : new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(
        number,
      );

const dollarFormat = number =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    number,
  );

const percentFormat = number => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  });
  return formatter.format(number);
};

const percentToText = percent => {
  if (percent <= 0.0005 && percent >= -0.0005) {
    return percent >= 0 ? 'Less than +0.05%' : 'Less than -0.05%';
  }
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percentFormat(percent)}`;
};

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
    if (String(newVal).trim() !== '') {
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

export {
  wholeNumberFormat,
  dollarFormat,
  percentFormat,
  percentToText,
  useQueryParams,
};
