import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useHistory, useParams} from 'react-router-dom';

function EditTodo(props) {
  const {getTodo, updateTodo, updateError, updatePending} = props;

  const history = useHistory();

  const {id} = useParams('id');

  const [value, setValue] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    // redux-rest-middleware APIs return a promise that
    // resolves with the payload on success or null
    // if an error occurred.
    getTodo(id).then(payload => {
      if (payload) {
        setValue(payload.content);
        setCompleted(payload.completed);
      } else {
        setFetchError('Failed to retrieve TODO');
      }
    });
    // eslint-disable-next-line
  }, []);

  const cancel = useCallback(() => {
    history.push('/');
  }, [history]);

  const save = useCallback(() => {
    updateTodo(id, {id, content: value, completed}).then(res => {
      // result is null in the case of an error
      if (res !== null) history.push('/');
    });
  }, [updateTodo, history, id, value, completed]);

  const onChangeInput = useCallback(
    e => {
      setValue(e.target.value);
    },
    [setValue]
  );

  if (updatePending) return <CircularProgress />;

  let errorMessage = null;
  if (fetchError) errorMessage = 'Error retrieving TODO';
  else if (updateError) errorMessage = updateError.toString();
  if (errorMessage) {
    return (
      <>
        <h3>Unable to Edit TODO</h3>
        <Box color="red" mb="1em">
          {errorMessage}
        </Box>
        <Button variant="contained" onClick={cancel}>
          BACK
        </Button>
      </>
    );
  }

  if (!value) return null;

  return (
    <>
      <h2>Edit Todo</h2>
      <Box mt="1em" mb="1em">
        <TextField
          id="edit-todo"
          variant="outlined"
          autoComplete="disable"
          onChange={onChangeInput}
          value={value}
        />
      </Box>
      <Box mt="1em" mb="1em">
        <Button variant="contained" onClick={cancel}>
          Cancel
        </Button>
        <Box component="span" ml="1em">
          <Button variant="contained" color="primary" onClick={save}>
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
}

EditTodo.propTypes = {
  getTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  updateError: PropTypes.shape({
    message: PropTypes.string
  }),
  updatePending: PropTypes.bool
};

export default EditTodo;
