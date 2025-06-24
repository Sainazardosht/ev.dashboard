// store/store.js (or store/index.js)
// Configure Redux store with slices

import { configureStore } from "@reduxjs/toolkit";

// Import reducers from slices
import variablesReducer from '../features/variables/variablesSlice'; // remove .jsx if no JSX inside
import expandReducer from '../features/expandMore/expandSlice';      // same here

// Create the Redux store with combined reducers
export const store = configureStore({
  reducer: {
    variables: variablesReducer,  // manages variables panel state
    expand: expandReducer,        // manages expansion states (best scenario, context window, etc.)
  },
});
