import * as todos from './todos/actions';

export default {
  getTodos: {
    url: '/api/todos',
    actions: [todos.getTodos, todos.getTodosSuccess, todos.getTodosError]
  },
  getTodo: {
    url: '/api/todos/:id',
    actions: [todos.getTodo, todos.getTodoSuccess, todos.getTodoError]
  },
  addTodo: {
    url: '/api/todos',
    actions: [todos.addTodo, todos.addTodoSuccess, todos.addTodoError]
  },
  updateTodo: {
    url: '/api/todos/:id',
    actions: [todos.updateTodo, todos.updateTodoSuccess, todos.updateTodoError]
  },
  deleteTodo: {
    url: '/api/todos/:id',
    actions: [todos.deleteTodo, todos.deleteTodoSuccess, todos.deleteTodoError]
  }
};
