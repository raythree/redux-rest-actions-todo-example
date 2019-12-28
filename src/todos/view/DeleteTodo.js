import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {useHistory, useParams} from 'react-router-dom';

import Confirmation from '../../components/Confirmation';

function DeleteTodo(props) {
  const {getTodo, deleteTodo, updatePending, updateError} = props;

  const history = useHistory();

  const {id} = useParams('id');

  const [todo, setTodo] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    getTodo(id).then(data => {
      if (todo) setTodo(data);
      else setFetchError('Failed to retrieve TODO');
    });
  }, [id, getTodo, todo, fetchError]);

  const onCancel = useCallback(() => {
    history.push('/');
  }, [history]);

  const onDelete = useCallback(() => {
    deleteTodo(id).then(res => {
      if (res !== null) history.push('/');
    });
  }, [history, id, deleteTodo]);

  if (updatePending) return <CircularProgress />;

  let errorMessage = null;
  if (fetchError) errorMessage = fetchError;
  else if (updateError) errorMessage = updateError;

  if (errorMessage)
    return (
      <>
        <h2>Unable to Delete TODO</h2>
        <Box color="red" mb="1em">
          {errorMessage}
        </Box>
        <Button variant="contained" onClick={onCancel}>
          BACK
        </Button>
      </>
    );

  if (!todo) return null;

  return (
    <>
      <Box mb="1em">
        <div>Delete TODO</div>
        <Confirmation onCancel={onCancel} onConfirm={onDelete}>
          <p className="warning">Are you sure you want to delete TODO:</p>
          <Paper>
            <Box p="1em">
              {todo.content} {todo.completed ? '(completed)' : '(not completed)'}
            </Box>
          </Paper>
        </Confirmation>
      </Box>
    </>
  );
}

DeleteTodo.propTypes = {
  getTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateError: PropTypes.object, // eslint-disable-line
  updatePending: PropTypes.bool
};

export default DeleteTodo;
