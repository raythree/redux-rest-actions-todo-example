import reducer from './reducer';
import {ALL, COMPLETED, NOT_COMPLETED} from './filters';

describe('todos root reducer tests', () => {
  it('should return the correct initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      list: {
        pending: false,
        todos: null,
        error: null
      },
      filters: {
        visibility: 'all',
        search: ''
      },
      update: {
        pending: false,
        error: null
      }
    });
  });
});
