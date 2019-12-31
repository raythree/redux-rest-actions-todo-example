import React from 'react';
import {api} from 'redux-rest-actions';
import {connect} from 'react-redux';
import TodosComponent from './TodosComponent';

import {updateFilters} from '../actions';
import * as selectors from '../selectors';

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
  todos: selectors.selectTodos(state),
  todo: selectors.selectTodo(state),
  listError: selectors.selectTodosError(state),
  pending: selectors.selectTodosPending(state),
  updatePending: selectors.selectUpdatePending(state),
  updateError: selectors.selectUpdateError(state),
  visibility: selectors.selectVisibility(state),
  searchFilter: selectors.selectSearchFilter(state),
  filters: selectors.selectFilters(state)
});

export default connect(mapStateToProps, {updateFilters})(TodosContainer);
