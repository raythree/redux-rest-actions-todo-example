import {createReducer} from '@reduxjs/toolkit';

import {initiate, error} from './reducerHelper';
import * as actions from '../actions';

function replaceTodo(draft, action) {
  const {id} = action.payload;
  const index = draft.todos.findIndex(e => e.id === id);
  if (index === -1) return;
  draft.todos.splice(index, 1, action.payload);
}

function deleteTodo(draft, action) {
  const {id} = action.payload;
  const index = draft.todos.findIndex(e => e.id === id);
  if (index === -1) return;
  draft.todos.splice(index, 1);
}

const initialState = {
  todos: [],
  pending: false,
  error: null
};

export default createReducer(initialState, {
  [actions.getTodos]: draft => {
    initiate(draft);
  },
  [actions.getTodosSuccess]: (draft, action) => {
    draft.pending = false;
    draft.todos = action.payload.todos;
  },
  [actions.addTodoSuccess]: (draft, action) => {
    draft.todos.push(action.payload);
  },
  [actions.deleteTodoSuccess]: (draft, action) => {
    deleteTodo(draft, action);
  },
  [actions.updateTodoSuccess]: (draft, action) => {
    replaceTodo(draft, action);
  },
  [actions.getTodosError]: (draft, action) => {
    error(draft, action);
  }
});
