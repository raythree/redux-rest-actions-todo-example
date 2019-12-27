import {createReducer} from '@reduxjs/toolkit';

import * as filters from '../filters';

import {setFilters} from '../actions';

const initialState = {
  search: '',
  visibility: filters.ALL
};

export default createReducer(initialState, {
  [setFilters]: (draft, action) => action.payload
});
