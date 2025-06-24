// features/variablesSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state: whether the variables panel is open or closed
const initialState = {
  variablesPanelOpen: false,  // false means panel is closed initially
};

// Create the slice with name, initial state, and reducers to open/close the panel
const variablesSlice = createSlice({
  name: 'variables',
  initialState,
  reducers: {
    // Action to open the variables panel
    openPanel(state) {
      state.variablesPanelOpen = true;
    },
    // Action to close the variables panel
    closePanel(state) {
      state.variablesPanelOpen = false;
    },
  },
});

// Export the actions to dispatch in components
export const { openPanel, closePanel } = variablesSlice.actions;

// Export the reducer to add to the store
export default variablesSlice.reducer;
