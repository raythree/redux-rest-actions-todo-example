import reducer from './listReducer';
import * as actions from '../actions';

describe('listReducer tests', () => {
  let initialState;
  let pendingState;
  let errorState;
  beforeEach(() => {
    initialState = {todos: null, pending: false, error: null};
    pendingState = {todos: null, pending: true, error: null};
    errorState = {todos: null, pending: true, error: new Error('failed')};
  });

  // initial state

  it('should return the correct initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      todos: null,
      error: null,
      pending: false
    });
  });

  // get todo list

  it('should handle getTodos', () => {
    expect(reducer(pendingState, actions.getTodos())).toEqual({
      todos: null,
      error: null,
      pending: true
    });
    expect(reducer(errorState, actions.getTodos())).toEqual({
      todos: null,
      error: null,
      pending: true
    });
  });

  it('should handle getTodosSuccess', () => {
    const action = actions.getTodosSuccess({todos: ['do stuff']});
    expect(reducer(initialState, action)).toEqual({
      todos: ['do stuff'],
      error: null,
      pending: false
    });
  });

  it('should handle getTodosError', () => {
    const action = actions.getTodosError(new Error('failed'));
    expect(reducer(initialState, action)).toEqual({
      todos: null,
      error: new Error('failed'),
      pending: false
    });
  });
});
