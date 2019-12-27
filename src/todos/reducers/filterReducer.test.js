import * as filters from '../filters';
import reducer from './filterReducer';
import {setFilters} from '../actions';

describe('filterReducer tests', () => {
  it('should have the right initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      visibility: filters.ALL,
      search: ''
    });
  });

  expect(
    reducer(filters.defaultFilters, setFilters({visibility: 'completed', search: 'query'}))
  ).toEqual({
    visibility: filters.COMPLETED,
    search: 'query'
  });
});
