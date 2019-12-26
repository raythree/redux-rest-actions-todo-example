/* eslint-disable no-unused-expressions */
import React from 'react';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import {render, fireEvent} from '@testing-library/react';
import DeleteTodo from './DeleteTodo';

describe('DeleteTodo tests', () => {
  let props = null;
  let history = null;
  beforeEach(() => {
    history = createMemoryHistory({initialEntries: ['/delete/1']});
    props = {};
    props.getTodo = jest.fn();
    props.deleteTodo = jest.fn().mockImplementation(() => Promise.resolve('1'));
    (props.todo = {id: '1', content: 'do something', completed: false}),
      (props.updatePending = false),
      (props.updateError = null);
    props.cancelUpdate = jest.fn();
  });

  it('renders', () => {
    // const h = {
    //   push: jest.fn(),
    //   listen: jest.fn(),
    //   location: {pathname: '/delete/1'}
    // }

    const {getByText} = render(
      <Router history={history}>
        <DeleteTodo {...props} />
      </Router>
    );

    expect(getByText(/are you sure/i));
    expect(getByText(/do something/i));
    expect(getByText(/not completed/i));
  });

  it('cancels delete', () => {
    const {getByText} = render(
      <Router history={history}>
        <DeleteTodo {...props} />
      </Router>
    );
    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(props.getTodo.mock.calls[0][0]).toBe(undefined);
    expect(history.entries[1].pathname).toBe('/');
  });

  it('issues delete call', () => {
    const {getByText} = render(
      <Router history={history}>
        <DeleteTodo {...props} />
      </Router>
    );
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);
    expect(props.deleteTodo.mock.calls.length).toBe(1);
  });
});
