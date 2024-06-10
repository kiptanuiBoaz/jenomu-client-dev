import { RootState } from './../store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/auth.types';

interface AuthInfoState {
    isAuthenticated: boolean;
    user: User;
}

const initialUserState: User = {
    email: "",
    id: "",
    lname: "",
    fname: "",
    phone_no: "",
    avatar: null,
    recycled: "",
    farmer: null,
    role: {
        id: "",
        Permissions: []
    }
};

const initialState: AuthInfoState = {
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
            state.user = action.payload;
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