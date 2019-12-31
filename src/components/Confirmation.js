import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

function Confirmation(props) {
  return (
    <Box mt="1em">
      <Box mb="1em">{props.children}</Box>
      <Button variant="contained" onClick={props.onCancel}>
        Cancel
      </Button>
      <Box component="span" ml="1em">
        <Button variant="contained" color="primary" onClick={props.onConfirm}>
          Delete
        </Button>
      </Box>
    </Box>
  );
}

Confirmation.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Confirmation;
