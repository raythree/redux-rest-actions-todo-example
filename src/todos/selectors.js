export const selectTodos = state => state.list.todos;
export const selectTodosError = state => state.list.error;
export const selectTodosPending = state => state.list.pending;

export const selectUpdatePending = state => state.update.pending;
export const selectUpdateError = state => state.update.error;
export const selectTodo = state => state.update.todo;

export const selectFilters = state => state.filters;
export const selectVisibility = state => state.filters.visibility;
export const selectSearchFilter = state => state.filters.search;
