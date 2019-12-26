import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

function ErrorMessage({error}) {
  return (
    <Box mt="3em" color="red">
      {error.message}
    </Box>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.object // eslint-disable-line
};

export default ErrorMessage;
