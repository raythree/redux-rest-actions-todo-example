/* eslint-disable no-unused-expressions */
import React from 'react';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';
import {render, fireEvent, wait, waitForDomChange} from '@testing-library/react';
import DeleteTodo from './DeleteTodo';

describe('DeleteTodo tests', () => {
  let props = null;
  let history = null;
  beforeEach(() => {
    history = createMemoryHistory({initialEntries: ['/delete/1']});
    props = {};
    props.getTodo = jest.fn(() => Promise.resolve({content: 'do stuff', completed: false}));
    props.deleteTodo = jest.fn().mockImplementation(() => Promise.resolve('1'));
    props.todo = {id: '1', content: 'do something', completed: false};
    props.updatePending = false;
    props.updateError = null;
    props.cancelUpdate = jest.fn();
  });

  it('cancels delete', async () => {
    const {findByText, getByText} = render(
      <Router history={history}>
        <DeleteTodo {...props} />
      </Router>
    );

    await wait(() => {
      findByText('Delete');
    });

    getByText(/do stuff/i);
    getByText(/not completed/i);

    const cancelButton = getByText('Cancel').parentNode;
    fireEvent.click(cancelButton);

    expect(props.deleteTodo.mock.calls.length).toBe(0);
    expect(history.entries[1].pathname).toBe('/');
  });

  it('issues delete', async () => {
    const {findByText, getByText} = render(
      <Router history={history}>
        <DeleteTodo {...props} />
      </Router>
    );

    await wait(() => {
      findByText('Delete');
    });

    const deleteButton = getByText('Delete').parentNode;
    fireEvent.click(deleteButton);
    expect(props.deleteTodo.mock.calls.length).toBe(1);
  });

  it('shows error message if getTodo fails', async () => {
    props.getTodo = jest.fn(() => Promise.resolve(null));
    const {getByText} = render(
      <Router history={history}>
        <DeleteTodo {...props} />
      </Router>
    );

    await waitForDomChange(document.body);
    getByText(/failed to retrieve/i);
  });

  it('stays on page if delete fails', async () => {
    props.deleteTodo = jest.fn().mockImplementation(() => Promise.resolve(null));

    const {findByText, getByText} = render(
      <Router history={history}>
        <DeleteTodo {...props} />
      </Router>
    );

    await wait(() => {
      findByText('Delete');
    });

    const deleteButton = getByText('Delete').parentNode;
    fireEvent.click(deleteButton);
    expect(props.deleteTodo.mock.calls.length).toBe(1);

    expect(history.entries.length).toBe(1);
  });
});
