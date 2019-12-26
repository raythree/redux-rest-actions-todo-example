import * as filters from '../filters';
import reducer from './filterReducer';
import {setFilters} from '../actions';

describe('filterReducer tests', () => {
  it('should have the right initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      visibilityFilter: filters.ALL,
      search: ''
    });
  });

  expect(
    reducer(filters.defaultFilters, setFilters({visibilityFilter: 'completed', search: 'query'}))
  ).toEqual({
    visibilityFilter: filters.COMPLETED,
    search: 'query'
  });
});
