# Redux Rest Actions TODO Example

Sample TODO app demonstrating the use of `redux-rest-actions` as discussed in [this Medium article](https://medium.com).

This app was generated with `create-react-app`, as setup pretty much as discussed in the article. It also added `react-router`, `react-router-dom` and `@material-ui-core`. It also includes tests using `@testing-library/react`. Any non-trivial SPA that you write will likely need to handle REST requests, multiple routes, and tests so you can use this as a starter.

Usage:

```
git clone https://github.com/raythree/redux-rest-actions-todo-example
cd redux-rest-actions-todo-example
yarn install
yarn start (or yarn test)
```
## Mock server

You can configure `redux-rest-middleware` to use `axios-mock-adapter`. You need to create a file called `.env.local` in the project root with this content:

```
REACT_APP_USE_MOCK_DATA=true
REACT_APP_ENABLE_MIDDLEWARE_LOGGING=true
```
The second line enables middleware logging to the console. Take a look in `src/App.js` and `src/store.js` to see how these options are enabled. See [Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/) in the create-react-app docs.

## Testing
Tests use the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro). This is a replacement for Enzyme and works on the DOM, just as a user would interact with your app.

## Quick Tutorial on Redux Rest Actions

For each REST request, you provide three actions that get dispatched by Redux Rest Actions:

```javascript
export default {
  getTodos: {
    url: '/api/todos',
    actions: [getTodos, getTodosSuccess, getTodosError]
  },
  updateTodos: {
    url: '/api/todos/:id',
    actions: [updateTodo, updateTodoSuccess, updateTodoError]
  }
} 
```
All three get dispatched by the middleware. You can provide either action creator functions or action `type` strings. For requests that require URL placeholders, URL parameters, data, headers, or some other request configuration it's easier to use action creators because they can format the data for the middleware. You can provide this data directly in calls to `api`, but this tutorial only covers the use of action creators.

To initiate the `getTodos` request, you don't directly call your action creator, you initiate it by invoking `api.getTodos` and you do so with whatever arguments `getTodos` expects. For this example, let's assume that `getTodos` accepts an optional filter parameter (`'complete'`, `'not_complete'`, or `'all'`). You invoke it like this (assuming you've already invoked `configureApi` with the REST configuration):

```javascript
import { api } 'redux-rest-actions';

api.getTodos();

// or

api.getTodos('complete');
```

What the middleware does is invoke your action creator with the same arguments, and looks for a `payload` property in the returned action. Since URL placeholders, data, and URL parameters are so common, it treats the payload as follows:

* Any URL placeholders, like `id`, will get substitued by `payload` properties with the same names.
* If the `payload` has a `data` property, then it will be used as the body of the request (for put and post), otherwise the whole `payload` will be used.
* If the `payload` has a `params` property then the content of `payload.params` (expects an object) will be used as the URL parameters.

So, let's see how to create a `getTodos` action that either takes no arguments, or takes a filter value:

```javascript
import { createAction } from '@reduxjs/toolkit';

export const getTodos = createAction('GET_TODOS', filter => {
  return filter ? {payload: {params: {filter}}} : {};
});
```
That's it! Now if we call `getTodos()` it will make a REST request as:

```
GET /api/todos
```
And if we call it with `getTodos('complete')` it will make the request:

```
GET /api/todos?filter=complete
```
Same idea for `updateTodo`, which needs to provide an `id` for the placeholder, and `data` for the PUT body:

```javascript
import { createAction } from '@reduxjs/toolkit';

export const getTodos = createAction('GET_TODOS', filter => {
  return filter ? {payload: {params: {filter}}} : {};
});
```
Now, invoking ```updateTodo('123', {content: 'do stuff'})``` will result in the action being dispatched to your reducer:

```javascript
{ type: 'UPDATE_TODO', payload: {id: '123', data: {content: 'do stuff'}}}
```
And the API request dispatched:

```
POST /api/todos/123
  body {content: 'do stuff'}
```







