import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import propertyReducer from "./propertySlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        property: propertyReducer
    }
})

export default store