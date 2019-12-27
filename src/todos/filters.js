/* eslint-disable id-match */
import queryString from 'query-string';

// visibility filter
export const ALL = 'all';
export const COMPLETED = 'completed';
export const NOT_COMPLETED = 'not_completed';

export function checkVisibility(s) {
  if (!s) return ALL;
  if (typeof s !== 'string') return ALL;
  const check = s.toLocaleLowerCase();
  if (check === ALL || check === COMPLETED || check === NOT_COMPLETED) {
    return check;
  }
  return ALL;
}

export const toQueryString = filters => {
  const obj = {visibility: filters.visibility};
  // don't include empty strings
  if (filters.search) obj.search = filters.search;
  return queryString.stringify(obj);
};

export const parseQueryString = s => {
  const obj = queryString.parse(s);
  const filters = {};
  if (!obj)
    return {
      visibility: ALL,
      search: ''
    };
  filters.search = obj.search || '';
  filters.visibility = checkVisibility(obj.visibility);
  return filters;
};
