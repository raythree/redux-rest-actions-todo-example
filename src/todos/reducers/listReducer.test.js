import reducer from './listReducer';
import * as actions from '../actions';

describe('listReducer tests', () => {
  let initialState;
  let pendingState;
  let errorState;
  beforeEach(() => {
    initialState = {todos: [], pending: false, error: null};
    pendingState = {todos: [], pending: true, error: null};
    errorState = {todos: [], pending: true, error: new Error('failed')};
  });

  // initial state

  it('should return the correct initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      todos: [],
      error: null,
      pending: false
    });
  });

  // get todo list

  it('should handle getTodos', () => {
    expect(reducer(pendingState, actions.getTodos())).toEqual({
      todos: [],
      error: null,
      pending: true
    });
    expect(reducer(errorState, actions.getTodos())).toEqual({
      todos: [],
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
      todos: [],
      error: new Error('failed'),
      pending: false
    });
  });

  it('should handle the update todo action', () => {
    const state = {
      todos: [
        {id: '1', content: 'do something'},
        {id: '2', content: 'do something else'}
      ],
      pending: false,
      error: null
    };
    const action = actions.updateTodoSuccess({id: '2', content: 'modified'});
    expect(reducer(state, action)).toEqual({
      todos: [
        {id: '1', content: 'do something'},
        {id: '2', content: 'modified'}
      ],
      pending: false,
      error: null
    });
  });
});
