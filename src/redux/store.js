import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './propertySlice'; // Import the property reducer
// import { useReducer } from 'react';
import userReducer from "./userSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    property: propertyReducer, // Add the property slice to the store
  },
});

export default store;
