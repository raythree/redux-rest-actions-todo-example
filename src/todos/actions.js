import {createAction} from '@reduxjs/toolkit';
import {toQueryString} from './filters';

export const getTodos = createAction('GET_TODOS', filters =>
  filters ? {payload: {params: {...filters}}} : {}
);
export const getTodosSuccess = createAction('GET_TODOS_SUCCESS');
export const getTodosError = createAction('GET_TODOS_ERROR');

export const getTodo = createAction('GET_TODO', id => ({payload: {id}}));
export const getTodoSuccess = createAction('GET_TODO_SUCCESS');
export const getTodoError = createAction('GET_TODO_ERROR');

export const addTodo = createAction('ADD_TODO', todo => ({
  payload: {data: {...todo, completed: false}}
}));
export const addTodoSuccess = createAction('ADD_TODO_SUCCESS');
export const addTodoError = createAction('ADD_TODO_ERROR');

export const updateTodo = createAction('UPDATE_TODO', (id, todo) => ({
  payload: {id, data: todo}
}));
export const updateTodoSuccess = createAction('UPDATE_TODO_SUCCESS');
export const updateTodoError = createAction('UPDATE_TODO_ERROR');

export const deleteTodo = createAction('DELETE_TODO', id => ({payload: {id}}));
export const deleteTodoSuccess = createAction('DELETE_TODO_SUCCESS');
export const deleteTodoError = createAction('DELETE_TODO_ERROR');

// This action stores current filters. Instead of calling it directly,
// updateFilters is invoked to change the URL in the browser, using
// redux-thunk to handle the side effect.
export const setFilters = createAction('SET_FILTERS');

export const updateFilters = (filters, history) => dispatch => {
  dispatch(setFilters(filters));
  history.push({search: toQueryString(filters)});
};
// This just clears the todo from the update reducer when we either
// save or cancel the edit action.
export const cancelUpdate = createAction('CANCEL_UPDATE');
