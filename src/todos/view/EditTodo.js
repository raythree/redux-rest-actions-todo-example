import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useHistory, useParams} from 'react-router-dom';

function EditTodo(props) {
  const {getTodo, updateTodo, cancelUpdate} = props;

  const history = useHistory();

  const {id} = useParams('id');

  const [value, setValue] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // redux-rest-middleware APIs return a promise that
    // resolves with the payload on success. We use this
    // to update local state with the TODO being edited.
    getTodo(id).then(payload => {
      if (payload && payload.content) {
        setValue(payload.content);
        setCompleted(payload.completed);
      }
    });
  }, [id, getTodo]);

  const cancel = useCallback(() => {
    cancelUpdate();
    history.push('/');
  }, [history, cancelUpdate]);

  const save = useCallback(() => {
    updateTodo(id, {id, content: value, completed}).then(() => {
      history.push('/');
    });
  }, [updateTodo, history, id, value, completed]);

  const onChangeInput = useCallback(
    e => {
      setValue(e.target.value);
    },
    [setValue]
  );

  if (props.updatePending) return <CircularProgress />;
  if (props.updateError)
    return (
      <>
        <Box color="red" mb="1em">
          {props.updateError.toString()}
        </Box>
        <Button variant="contained" onClick={cancel}>
          BACK
        </Button>
      </>
    );

  if (!props.todo) return null;

  return (
    <>
      <div>Edit Todo</div>
      <Box mt="1em" mb="1em">
        <TextField id="edit-todo" variant="outlined" onChange={onChangeInput} value={value} />
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
  cancelUpdate: PropTypes.func,
  updateError: PropTypes.shape({
    message: PropTypes.string
  }),
  updatePending: PropTypes.bool,
  todo: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    completed: PropTypes.bool
  })
};

export default EditTodo;
