// for all requests, set the pending flag and clear the error flag
export function initiate(draft) {
  draft.pending = true;
  draft.error = null;
}

// for errors, clear pending flag and store the error
export function error(draft, action) {
  // eslint-disable-next-line
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line
    console.log(`ERROR: ${action.payload.toString()}`);
  }
  draft.pending = false;
  draft.error = action.payload;
}
