import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

function ErrorMessage({error, retry}) {
  return (
    <Box mt="1em" color="red">
      {error}
      {retry && (
        <Box m="1em">
          <Button onClick={retry} variant="contained">
            Retry
          </Button>
        </Box>
      )}
    </Box>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
  retry: PropTypes.func
};

export default ErrorMessage;
