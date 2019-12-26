import {api} from 'redux-rest-actions';
//
// Simulated TODO server.
//
export function mockServer() {
  let nextId = 4; // eslint-disable-line

  const todos = [
    {id: '1', content: 'Learn React', completed: false},
    {id: '2', content: 'Learn Redux', completed: false},
    {id: '3', content: 'Build an app', completed: false}
  ];

  const httpOk = 200;
  const httpCreated = 201;
  const httpNotFound = 404;

  function getId(config) {
    const parts = config.url.split('/');
    // eslint-disable-next-line
    if (parts.length === 4) return parts[3];
    return '';
  }

  // Handlers return an array in the form of [status, data, headers]

  function listTodos(config) {
    let newTodos = [...todos];
    //  eslint-disable-next-line
    console.log(`query ===> ${JSON.stringify(config.params)}`);
    let vf = 'all';
    if (config.params && config.params.filters && config.params.filters.visibilityFilter) {
      vf = config.params.filters.visibilityFilter;
    }
    newTodos = newTodos.filter(item => {
      if (vf === 'all') return true;
      else if (vf === 'completed' && item.completed) return true;
      else if (vf === 'not_completed' && !item.completed) return true;
      return false;
    });
    if (config.params && config.params.filters && config.params.filters.search) {
      newTodos = newTodos.filter(item => {
        const match = config.params.filters.search.toLowerCase();
        return item.content.toLowerCase().indexOf(match) >= 0;
      });
    }
    const result = {todos: newTodos};
    return [httpOk, result];
  }

  function getTodo(config) {
    const id = getId(config);
    let found = null;
    todos.forEach(item => {
      if (item.id === id) found = item;
    });
    if (!found) return [httpNotFound];
    return [httpOk, found];
  }

  function listOrOneTodo(config) {
    const id = getId(config);
    if (id) {
      return getTodo(config);
    }
    return listTodos(config);
  }

  function addTodo(config) {
    const newTodo = {...JSON.parse(config.data)};
    newTodo.id = String(nextId++);
    todos.push(newTodo);
    return [httpCreated, newTodo];
  }

  function updateTodo(config) {
    const id = getId(config);
    const index = todos.findIndex(e => e.id === id);
    if (index === -1) return [httpNotFound];
    const updatedTodo = JSON.parse(config.data);
    todos.splice(index, 1, updatedTodo);
    return [httpOk, updatedTodo];
  }

  function deleteTodo(config) {
    const id = getId(config);
    const index = todos.findIndex(e => e.id === id);
    if (index === -1) return [httpNotFound];
    todos.splice(index, 1);
    return [httpOk, {id}];
  }

  api.mockAdapter.onGet(/\/api\/todos\/*\d*/).reply(listOrOneTodo);
  api.mockAdapter.onPost('/api/todos').reply(addTodo);
  api.mockAdapter.onPut(/\/api\/todos\/\d+/).reply(updateTodo);
  api.mockAdapter.onDelete(/\/api\/todos\/\d+/).reply(deleteTodo);
}

export default mockServer;
