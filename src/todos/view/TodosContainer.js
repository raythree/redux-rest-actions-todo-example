import React from 'react';
import {api} from 'redux-rest-actions';
import {connect} from 'react-redux';
import TodosComponent from './TodosComponent';

import {updateFilters, cancelUpdate} from '../actions';
import {
  // For client side filtering
  // selectVisibleTodos,
  selectTodos,
  selectTodo,
  selectTodosError,
  selectTodosPending,
  selectUpdatePending,
  selectUpdateError,
  selectVisibility,
  selectSearchFilter,
  selectFilters
} from '../selectors';

function TodosContainer(props) {
  return (
    <TodosComponent
      {...props}
      getTodos={api.getTodos}
      getTodo={api.getTodo}
      addTodo={api.addTodo}
      updateTodo={api.updateTodo}
      deleteTodo={api.deleteTodo}
    />
  );
}

const mapStateToProps = state => ({
  // For client side filtering, use the next line instead
  // todos: selectVisibleTodos(state),
  todos: selectTodos(state),
  todo: selectTodo(state),
  listError: selectTodosError(state),
  pending: selectTodosPending(state),
  updatePending: selectUpdatePending(state),
  updateError: selectUpdateError(state),
  visibility: selectVisibility(state),
  searchFilter: selectSearchFilter(state),
  filters: selectFilters(state)
});

export default connect(mapStateToProps, {updateFilters, cancelUpdate})(TodosContainer);
