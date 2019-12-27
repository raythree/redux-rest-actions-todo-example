import React from 'react';
import Box from '@material-ui/core/Box';

import * as filters from '../filters';
import filtersPropTypes from './filtersPropTypes';

function EmptyList(props) {
  const {visibility, search} = props.filters;

  let message = 'You have nothing to do!';

  if (visibility === filters.NOT_COMPLETED) {
    message = 'You have no uncompleted items';
    if (search) message += ' that match your search';
  } else if (visibility === filters.COMPLETED) {
    message = 'You have no completed items';
    if (search) message += ' that match your search';
  } else if (search) {
    message = 'You have nothing to do that matches your search';
  }
  return <Box mt="2em">{message}</Box>;
}

EmptyList.propTypes = {
  filters: filtersPropTypes
};

export default EmptyList;
