import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    sortField: string;
    selectedStatuses: string[];
    datePosted: string;
    startDate: string;
    budget: string;
    jobType: string;
    skillsRequired: string[];
    jobTabs: number;
    searchTerm: string;
}

const initialState: FilterState = {
    sortField: 'ascending',
    selectedStatuses: [],
    datePosted: '',
    startDate: 'In the next week',
    budget: 'Less than $100',
    jobType: '',
    skillsRequired: [],
    jobTabs: 0,
    searchTerm: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSortField(state, action: PayloadAction<string>) {
            state.sortField = action.payload;
        },
        setSelectedStatuses(state, action: PayloadAction<string[]>) {
            state.selectedStatuses = action.payload;
        },
        setDatePosted(state, action: PayloadAction<string>) {
            state.datePosted = action.payload;
        },
        setStartDate(state, action: PayloadAction<string>) {
            state.startDate = action.payload;
        },
        setBudget(state, action: PayloadAction<string>) {
            state.budget = action.payload;
        },
        setJobType(state, action: PayloadAction<string>) {
            state.jobType = action.payload;
        },
        setSkillsRequired(state, action: PayloadAction<string[]>) {
            state.skillsRequired = action.payload;
        },
        setJobTabs(state, action: PayloadAction<number>) {

            state.jobTabs = action.payload;
        },
        setSearchTerm(state, action: PayloadAction<string>) {

            state.searchTerm = action.payload;
        },
        resetFilterFields(_state) {
            return initialState;
        },
    },
});

export const {
    setSortField,
    setSelectedStatuses,
    setDatePosted,
    setStartDate,
    setBudget,
    setJobType,
    setSkillsRequired,
    setJobTabs,
    setSearchTerm,
    resetFilterFields,
} = filterSlice.actions;

export const selectFilterFields = (state: { filter: FilterState }) => state.filter;

export default filterSlice.reducer;
