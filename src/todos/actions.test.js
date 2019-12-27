// just test actions where we form the payload

import {getTodos, getTodo, addTodo, updateTodo, deleteTodo} from './actions';

describe('todo action tests', () => {
  it('should create the getTodos action', () => {
    let action = getTodos();
    expect(action).toEqual({
      type: 'GET_TODOS'
    });

    action = getTodos({visibility: 'complete'});
    expect(action).toEqual({
      type: 'GET_TODOS',
      payload: {params: {visibility: 'complete'}}
    });
  });

  it('should create the getTodo action', () => {
    let action = getTodo('123');
    expect(action).toEqual({
      type: 'GET_TODO',
      payload: {id: '123'}
    });
  });

  it('should create the addTodo action', () => {
    let action = addTodo({content: 'do stuff'});
    expect(action).toEqual({
      type: 'ADD_TODO',
      payload: {
        data: {
          content: 'do stuff',
          completed: false
        }
      }
    });
  });
});
