import * as filters from './filters';

describe('filter tests', () => {
  it('sets correct defaults for all empty or invalid filter strings', () => {
    const defaultValues = {
      visibilityFilter: filters.ALL,
      search: ''
    };
    expect(filters.parseQueryString()).toEqual(defaultValues);
    expect(filters.parseQueryString(null)).toEqual(defaultValues);
    expect(filters.parseQueryString('')).toEqual(defaultValues);
    expect(filters.parseQueryString('a=b&c=d')).toEqual(defaultValues);
    expect(filters.parseQueryString('asdfasdfasdfasfd')).toEqual(defaultValues);
  });

  it('parses valid query params', () => {
    expect(filters.parseQueryString('search=Hello&visibility=not_completed')).toEqual({
      search: 'Hello',
      visibilityFilter: filters.NOT_COMPLETED
    });
    expect(filters.parseQueryString('?visibility=not_completed')).toEqual({
      search: '',
      visibilityFilter: filters.NOT_COMPLETED
    });
  });

  it('enforces valid visibilityFilter values', () => {
    expect(filters.checkVisibilityFilter()).toBe(filters.ALL);
    expect(filters.checkVisibilityFilter(undefined)).toBe(filters.ALL);
    expect(filters.checkVisibilityFilter('')).toBe(filters.ALL);
    expect(filters.checkVisibilityFilter({})).toBe(filters.ALL);

    expect(filters.checkVisibilityFilter('ALL')).toBe(filters.ALL);
    expect(filters.checkVisibilityFilter('all')).toBe(filters.ALL);
    expect(filters.checkVisibilityFilter('Completed')).toBe(filters.COMPLETED);
    expect(filters.checkVisibilityFilter('completed')).toBe(filters.COMPLETED);
    expect(filters.checkVisibilityFilter('not_completed')).toBe(filters.NOT_COMPLETED);
  });

  it('stringifies valid values', () => {
    let qs = filters.toQueryString({
      visibilityFilter: filters.ALL,
      search: ''
    });
    expect(qs).toBe('visibility=all');

    qs = filters.toQueryString({
      visibilityFilter: filters.COMPLETED,
      search: 'hello there'
    });
    expect(qs).toBe('search=hello%20there&visibility=completed');
  });
});
