import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {useHistory, useParams} from 'react-router-dom';

import Confirmation from '../../components/Confirmation';
import todoPropTyes from './todoPropTypes';

function DeleteTodo(props) {
  const {getTodo, todo, deleteTodo, cancelUpdate} = props;

  const history = useHistory();

  const {id} = useParams('id');

  useEffect(() => {
    getTodo(id);
  }, [id, getTodo]);

  const onCancel = useCallback(() => {
    cancelUpdate();
    history.push('/');
  }, [history, cancelUpdate]);

  const onDelete = useCallback(() => {
    deleteTodo(id).then(() => {
      history.push('/');
    });
  }, [history, id, deleteTodo]);

  if (props.updatePending) return <CircularProgress />;
  if (props.updateError)
    return (
      <>
        <Box color="red" mb="1em">
          {props.updateError.toString()}
        </Box>
        <Button variant="contained" onClick={onCancel}>
          BACK
        </Button>
      </>
    );

  if (!props.todo) return null;

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
  updatePending: PropTypes.bool,
  todo: todoPropTyes,
  cancelUpdate: PropTypes.func
};

export default DeleteTodo;
