import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: JSON.parse(sessionStorage.getItem("username")) || null, 
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.username = action.payload.username; 
      sessionStorage.setItem("username", JSON.stringify(action.payload.username));
      localStorage.setItem("authToken", action.payload.token); 
    },
    logOut: (state) => {
      state.username = null; 
      sessionStorage.removeItem("username");
      localStorage.removeItem("authToken"); 
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
