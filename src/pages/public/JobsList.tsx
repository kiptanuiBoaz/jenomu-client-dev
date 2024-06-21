import { useState } from 'react';
import Navbar from '../../components/Navbar';
import JobsTabs from '../../components/JobTabs';
import { Container, Grid, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { getUserInfoState } from '../../redux/slices/authSlice';
import { useTheme } from '@mui/material/styles';
import FilterDrawer from '../../components/FIlterDrawer';
import FilteredJobs from '../../components/FilterdJobs';
import { useQuery } from '@tanstack/react-query';
import { baseGet } from '../../utils/apiClient';
import { selectFilterFields } from '../../redux/slices/filterSlice';

const JobsList = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const { isAuthenticated } = useSelector(getUserInfoState);
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const filterFields = useSelector(selectFilterFields);
    const { data, isLoading, isError } = useQuery({
        queryFn: async () => await baseGet(`/v1/job/all/`),
        queryKey: ["jobs"],
    });
    console.log(data)
    const handleToggleFilter = () => {
        setFilterOpen(!filterOpen);
    };

    const filterJobs = (jobs: any) => {
        return jobs.filter((job: any) => {

            // Filter by job type
            // if (filterFields.jobType && job.job_type !== filterFields.jobType) {
            //     return false;
            // }
            // // Filter by budget
            // if (filterFields.budget === 'Less than $100' && job.proposed_budget >= 100) {
            //     return false;
            // }
            // if (filterFields.budget === '$100 - $1000' && (job.proposed_budget < 100 || job.proposed_budget > 1000)) {
            //     return false;
            // }
            // if (filterFields.budget === 'More than $1000' && job.proposed_budget <= 1000) {
            //     return false;
            // }
            // // Filter by statuses
            // if (filterFields.selectedStatuses.length && !filterFields.selectedStatuses.includes(job.status)) {
            //     return false;
            // }
            // // Filter by skills required
            // if (filterFields.skillsRequired.length && !filterFields.skillsRequired.every(skill => job.skills_required.includes(skill))) {
            //     return false;
            // }
            // // Filter by search term
            // if (filterFields.searchTerm && !job.name.toLowerCase().includes(filterFields.searchTerm.toLowerCase())) {
            //     return false;
            // }
            return true;
        });
    };

    const sortJobs = (jobs: any) => {
        if (filterFields.jobTabs === 1) {
            // Best Match logic (customize as needed)
            return jobs; // Placeholder for best match logic
        }
        if (filterFields.jobTabs === 2) {
            // Most Recent
            // @ts-ignore
            return jobs.sort((a: any, b: any) => new Date(b.created_at) - new Date(a.created_at));
        }
        return jobs;
    };

    const filteredJobs = data ? sortJobs(filterJobs(data)) : [];

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Something went wrong</Typography>;

    return (
        <>

            <Container maxWidth="lg" sx={{ paddingTop: "100px" }}>
                <Grid container spacing={2}>
                    {!isMediumScreen && (
                        <Grid item xs={12} md={3}>
                            <IconButton
                                color="inherit"
                                edge="start"
                                onClick={handleToggleFilter}
                                sx={{ display: { md: 'none' } }}
                            >
                                <Menu />
                            </IconButton>
                        </Grid>
                    )}
                    <Grid item xs={12} md={3}>
                        <FilterDrawer open={filterOpen} onClose={handleToggleFilter} />
                    </Grid>
                    <Grid sx={{ flexGrow: 1 }} item xs={12} md={9}>
                        <JobsTabs />
                        <FilteredJobs filteredJobs={filteredJobs} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default JobsList;