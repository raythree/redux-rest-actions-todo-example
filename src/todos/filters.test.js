import * as filters from './filters';

describe('filter tests', () => {
  it('sets correct defaults for all empty or invalid filter strings', () => {
    const defaultValues = {
      visibility: filters.ALL,
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
      visibility: filters.NOT_COMPLETED
    });
    expect(filters.parseQueryString('?visibility=not_completed')).toEqual({
      search: '',
      visibility: filters.NOT_COMPLETED
    });
  });

  it('enforces valid visibility values', () => {
    expect(filters.checkVisibility()).toBe(filters.ALL);
    expect(filters.checkVisibility(undefined)).toBe(filters.ALL);
    expect(filters.checkVisibility('')).toBe(filters.ALL);
    expect(filters.checkVisibility({})).toBe(filters.ALL);

    expect(filters.checkVisibility('ALL')).toBe(filters.ALL);
    expect(filters.checkVisibility('all')).toBe(filters.ALL);
    expect(filters.checkVisibility('Completed')).toBe(filters.COMPLETED);
    expect(filters.checkVisibility('completed')).toBe(filters.COMPLETED);
    expect(filters.checkVisibility('not_completed')).toBe(filters.NOT_COMPLETED);
  });

  it('stringifies valid values', () => {
    let qs = filters.toQueryString({
      visibility: filters.ALL,
      search: ''
    });
    expect(qs).toBe('visibility=all');

    qs = filters.toQueryString({
      visibility: filters.COMPLETED,
      search: 'hello there'
    });
    expect(qs).toBe('search=hello%20there&visibility=completed');
  });
});
