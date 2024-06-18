import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { all_jobs } from '../../utils/data';

interface JobState {
    sortField: string[];
    selectedStatuses: string[];
    jobs: any;
}

const initialState: JobState = {
    sortField: [],
    selectedStatuses: [],
    jobs: [],
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setAllJobs(state, action) {
            state.jobs = action.payload;
        },
        setSortField(state, action: PayloadAction<string[]>) {
            state.sortField = action.payload;
        },
        setSelectedStatuses(state, action: PayloadAction<string[]>) {
            state.selectedStatuses = action.payload;
            state.jobs = action.payload.length === 0
                ? all_jobs
                : all_jobs.filter(job => action.payload.includes(job.status as string));
        },
    },
});

export const { setSortField, setSelectedStatuses, setAllJobs } = jobsSlice.actions;

export default jobsSlice.reducer;
