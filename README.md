# Redux Rest Actions TODO Example

Sample TODO app demonstrating the use of `redux-rest-actions` as discussed in [this Medium article](https://medium.com/@raythree/redux-rest-actions-dead-simple-redux-rest-middleware-4bfbe1d7a615).

This app was generated with `create-react-app`, as setup pretty much as discussed in the article. It also added `react-router`, `react-router-dom` and `@material-ui-core`. It also includes a few sample tests using `@testing-library/react`. Any non-trivial SPA that you write will likely need to handle REST requests, multiple routes, and tests so you can use this as a starter.

Usage:

```
git clone https://github.com/raythree/redux-rest-actions-todo-example
cd redux-rest-actions-todo-example
yarn install
yarn start (or yarn test)
```

## Scripts
```
yarn start          - runs locally in watch node
yarn build          - build production version
yarn test           - run tests
yarn tests:coverage - run tests with coverage
yarn deploy         - deploys to github pages (edit homepage in package.json)
```

## Mock server

You can configure `redux-rest-middleware` to use `axios-mock-adapter`. You need to create a file called `.env.local` in the project root with this content:

```
REACT_APP_USE_MOCK_DATA=true
REACT_APP_ENABLE_MIDDLEWARE_LOGGING=true
```
The second line enables middleware logging to the console. Take a look in `src/App.js` and `src/store.js` to see how these options are enabled. See [Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/) in the create-react-app docs.

## Todo Server

If you instead want to run it with a real server, you can get a [Demo Todo Server here](https://github.com/raythree/todoserver). Just do:

```
git clone https://github.com/raythree/todoserver
cd todoserver
npm install
npm start
```
And the server will be running on port 4000. Then, instead of the ```.env.local``` above, use this:

```
REACT_APP_BASE_URL=http://localhost:4000
```

