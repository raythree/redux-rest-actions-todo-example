import {createReducer} from '@reduxjs/toolkit';

import {initiate, error} from './reducerHelper';
import * as actions from '../actions';

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
    draft.pending = false;
  },
  [actions.deleteTodoSuccess]: (draft, action) => {
    draft.pending = false;
  },
  [actions.updateTodoSuccess]: (draft, action) => {
    draft.pending = false;
  },
  [actions.getTodosError]: (draft, action) => {
    error(draft, action);
  }
});
