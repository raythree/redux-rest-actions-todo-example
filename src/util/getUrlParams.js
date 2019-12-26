import queryString from 'query-string';

export default function getUrlParams() {
  const params = queryString.parse(window.location.search);
  return params || {};
}
