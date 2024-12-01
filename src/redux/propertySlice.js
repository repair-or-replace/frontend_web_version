import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    propertyId: null, 
  };

const propertySlice = createSlice({
    name: "property",
    initialState,
    reducers: {
        setPropertyId: (state, action) => {
            state.propertyId = action.payload;
            console.log("Property ID:", action.payload.propertyId)
            console.log("Property ID stored:", state.propertyId)
        }
    }
});

export const { setPropertyId } = propertySlice.actions;

export default propertySlice.reducer;