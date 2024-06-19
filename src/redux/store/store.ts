
import authReducer from "../slices/authSlice";
import filterReducer from '../slices/filterSlice';
import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "../slices/navigationSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        filter: filterReducer,
        navigation: navigationReducer,
    },
});


store.subscribe(() => {
    localStorage.setItem("auth", JSON.stringify(store.getState().auth));
    localStorage.setItem("navigation", JSON.stringify(store.getState().navigation));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;