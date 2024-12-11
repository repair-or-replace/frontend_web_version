import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  propertyId: null, // default to null, meaning no property is selected
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setPropertyId: (state, action) => {
      state.propertyId = action.payload; // Store the propertyId in state
    },
  },
});

export const { setPropertyId } = propertySlice.actions;

export default propertySlice.reducer;
