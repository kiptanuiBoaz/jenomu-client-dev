// src/redux/slices/navigationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
    currentJob: string | null;
}

const initialState: NavigationState = {
    currentJob: null,
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setCurrentJob(state, action: PayloadAction<string | null>) {
            state.currentJob = action.payload;
        },
        clearCurrentJob(state) {
            state.currentJob = null;
        },
    },
});

export const { setCurrentJob, clearCurrentJob } = navigationSlice.actions;
export default navigationSlice.reducer;
