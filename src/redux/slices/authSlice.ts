import { RootState } from './../store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthInfoState, User } from '../../types/auth.types';

const storedAuth = JSON.parse(localStorage.getItem('auth') as string);


const initialUserState = {};


const initialState: AuthInfoState = storedAuth ?? {
    user: initialUserState,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = initialState.user;
        },
        setUserInfo(state, action: PayloadAction<User>) {
            state.isAuthenticated = true;
            state.user.user = action.payload;
        },
        resetUserInfo(state) {
            state.user = initialUserState;
        },
        setAthenticationState(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        }
    },
});

export const { setUserInfo, resetUserInfo, login, logout } = authSlice.actions;
export default authSlice.reducer;

export const getUserInfoState = (state: RootState) => state.auth;