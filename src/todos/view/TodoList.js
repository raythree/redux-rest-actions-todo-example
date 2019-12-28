/* eslint-disable id-match */
import React, {useEffect, useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {useHistory} from 'react-router-dom';

import EmptyList from './EmptyList';
import ErrorMessage from './ErrorMessage';
import ButtonMenu from '../../components/ButtonMenu';
import todoPropTypes from './todoPropTypes';
import filtersPropTypes from './filtersPropTypes';
import {COMPLETED, NOT_COMPLETED, parseQueryString} from '../filters';

function TodoList(props) {
  const {
    getTodos,
    visibility,
    searchFilter,
    updateFilters,
    addTodo,
    updateTodo,
    pending,
    updatePending,
    todos,
    error,
    filters
  } = props;

  function filterDisplay(f) {
    if (f === NOT_COMPLETED) return 'Not completed';
    else if (f === COMPLETED) return 'Completed';
    return 'All';
  }

  const filterOpts = [
    {value: 'all', display: 'All'},
    {value: 'completed', display: 'Completed'},
    {value: 'not_completed', display: 'Not completed'}
  ];

  const [newTodo, setNewTodo] = useState('');
  const history = useHistory();

  useEffect(() => {
    const filterValues = parseQueryString(window.location.search);
    updateFilters(filterValues, history);
    getTodos(filterValues);
  }, [getTodos, updateFilters, history]);

  const deleteItem = useCallback(
    id => {
      history.push(`/delete/${id}`);
    },
    [history]
  );

  const changeFilter = useCallback(
    f => {
      const newFilters = {...filters, visibility: f};
      updateFilters(newFilters, history);
      getTodos(newFilters);
    },
    [getTodos, filters, updateFilters, history]
  );

  const changeSearch = useCallback(
    e => {
      const newFilters = {...filters, search: e.target.value};
      updateFilters(newFilters, history);
      getTodos(newFilters);
    },
    [getTodos, filters, updateFilters, history]
  );

  const editItem = useCallback(
    id => {
      history.push(`/edit/${id}`);
    },
    [history]
  );

  const toggleComplete = useCallback(
    item => {
      updateTodo(item.id, {...item, completed: !item.completed}).then(() => getTodos(filters));
    },
    [getTodos, filters, updateTodo]
  );

  const retry = useCallback(() => {
    getTodos(filters);
  }, [getTodos, filters]);

  const setTodo = useCallback(e => {
    setNewTodo(e.target.value);
  }, []);

  const addNewTodo = useCallback(() => {
    const value = newTodo.trim();
    if (!value) return;
    addTodo({content: value}).then(res => {
      if (res) {
        setNewTodo('');
        getTodos(filters);
      }
    });
  }, [addTodo, newTodo, getTodos, filters]);

  const handleKeypress = useCallback(
    e => {
      if (e.key === 'Enter') {
        addNewTodo();
      }
    },
    [addNewTodo]
  );

  const busy = useMemo(() => pending || updatePending, [pending, updatePending]);

  const listOrErrorMessage = useMemo(() => {
    if (error) return <ErrorMessage retry={retry} error={error} />;
    if (!todos) return null;

    const empty = todos.length ? null : <EmptyList filters={filters} />;

    return (
      empty || (
        <List>
          {todos.map(item => (
            <ListItem key={item.id} divider>
              <ListItemIcon>
                <Checkbox
                  disableRipple
                  edge="start"
                  disabled={busy}
                  checked={item.completed}
                  tabIndex={-1}
                  onChange={toggleComplete.bind(null, item)}
                />
              </ListItemIcon>
              <ListItemText primary={item.content} />
              <Box component="span" ml={'1em'}>
                <IconButton
                  aria-label="edit"
                  onClick={editItem.bind(null, item.id)}
                  disabled={busy}
                >
                  <EditIcon />
                </IconButton>
              </Box>
              <IconButton
                aria-label="delete"
                onClick={deleteItem.bind(null, item.id)}
                disabled={busy}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )
    );
  }, [todos, busy, deleteItem, editItem, toggleComplete, error, filters, retry]);

  return (
    <>
      <div className="header">
        <h2>Todo List</h2>
      </div>
      <Toolbar>
        <TextField
          id="add-todo"
          variant="outlined"
          placeholder="Add a new TODO item"
          value={newTodo}
          onChange={setTodo}
          disabled={busy}
          onKeyPress={handleKeypress}
          autoComplete="off"
          size="small"
        />
        <Box component="span" ml="1em">
          <Button variant="contained" color="primary" disabled={busy} onClick={addNewTodo}>
            <AddIcon />
          </Button>
        </Box>
        <Box ml="1em">
          Showing: {filterDisplay(visibility)}
          <ButtonMenu
            label="Change Filter"
            items={filterOpts}
            onChange={changeFilter}
            component="span"
            selected={visibility}
          />
        </Box>
        <TextField
          id="search-todo"
          variant="outlined"
          placeholder="Search"
          value={searchFilter}
          onChange={changeSearch}
          autoComplete="off"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <Box component="span" ml="1em">
          {busy && <CircularProgress color="secondary" />}
        </Box>
      </Toolbar>
      {listOrErrorMessage}
    </>
  );
}

TodoList.propTypes = {
  pending: PropTypes.bool,
  updatePending: PropTypes.bool,
  todos: PropTypes.arrayOf(todoPropTypes),
  getTodos: PropTypes.func,
  addTodo: PropTypes.func,
  updateTodo: PropTypes.func,
  visibility: PropTypes.string,
  searchFilter: PropTypes.string,
  updateFilters: PropTypes.func,
  error: PropTypes.object, // eslint-disable-line
  filters: filtersPropTypes
};

export default TodoList;
