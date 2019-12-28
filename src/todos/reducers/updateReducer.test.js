import reducer from './updateReducer';
import * as actions from '../actions';

describe('updateReducer tests', () => {
  let initialState;
  let pendingState;
  let errorState;
  beforeEach(() => {
    initialState = {pending: false, error: null};
    pendingState = {pending: true, error: null};
    errorState = {pending: true, error: new Error('failed')};
  });

  // initial state

  it('should return the correct initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      error: null,
      pending: false
    });
  });

  // add todo

  it('should handle addTodo', () => {
    expect(reducer(initialState, actions.addTodo({content: 'do stuff'}))).toEqual({
      error: null,
      pending: true
    });
  });

  it('should handle addTodoSuccess', () => {
    expect(reducer(pendingState, actions.addTodoSuccess())).toEqual({
      error: null,
      pending: false
    });
  });

  it('should handle addTodoError', () => {
    expect(reducer(pendingState, actions.addTodoError(new Error('failed')))).toEqual({
      error: new Error('failed'),
      pending: false
    });
  });

  // update a todo

  it('should handle updateTodo', () => {
    expect(reducer(initialState, actions.updateTodo('1', 'do stuff'))).toEqual({
      error: null,
      pending: true
    });
  });

  it('should handle updateTodoSuccess', () => {
    expect(reducer(pendingState, actions.updateTodoSuccess())).toEqual({
      error: null,
      pending: false
    });
  });

  it('should handle updateTodoError', () => {
    expect(reducer(pendingState, actions.updateTodoError(new Error('failed')))).toEqual({
      error: new Error('failed'),
      pending: false
    });
  });

  // delete a todo

  it('should handle deleteTodo', () => {
    expect(reducer(initialState, actions.deleteTodo('1'))).toEqual({
      error: null,
      pending: true
    });
    expect(reducer(errorState, actions.deleteTodo('1'))).toEqual({
      error: null,
      pending: true
    });
  });

  it('should handle deleteTodoSuccess', () => {
    expect(reducer(pendingState, actions.deleteTodoSuccess())).toEqual({
      error: null,
      pending: false
    });
  });

  it('should handle deleteTodoError', () => {
    expect(reducer(pendingState, actions.deleteTodoError(new Error('failed')))).toEqual({
      error: new Error('failed'),
      pending: false
    });
  });
});
