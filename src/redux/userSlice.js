import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: JSON.parse(sessionStorage.getItem("username")) || null,
  authToken: localStorage.getItem("authToken") || null, // Load token from localStorage
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.username = action.payload.username; // Set username in state
      state.authToken = action.payload.token;   // Set token in state
      sessionStorage.setItem("username", JSON.stringify(action.payload.username));
      localStorage.setItem("authToken", action.payload.token);
    },
    logOut: (state) => {
      state.username = null; // Clear username in state
      state.authToken = null; // Clear token in state
      sessionStorage.removeItem("username");
      localStorage.removeItem("authToken");
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;

