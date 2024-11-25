import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: JSON.parse(sessionStorage.getItem("username")) || null,
  authToken: localStorage.getItem("authToken") || null, 
  userId: sessionStorage.getItem("userId") || null, 
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // logIn: (state, action) => {
    //   console.log('Logging in user:', action.payload.username); 
    //   console.log('User id:', action.payload.user_id); 
    //   state.username = action.payload.username; 
    //   state.authToken = action.payload.token;  
    //   state.userId = action.payload.user_id; 
    //   sessionStorage.setItem("userId", action.payload.user_id); 
    //   sessionStorage.setItem("username", JSON.stringify(action.payload.username));
    //   localStorage.setItem("authToken", action.payload.token);
    // },
    logIn: (state, action) => {
      state.authToken = action.payload.token;
      state.userId = action.payload.user_id;
      state.username = action.payload.username;
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("userId", action.payload.user_id);
    },
    
    logOut: (state) => {
      state.username = null; 
      state.authToken = null; 
      sessionStorage.removeItem("username");
      localStorage.removeItem("authToken");
    },
  },
});


export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;

