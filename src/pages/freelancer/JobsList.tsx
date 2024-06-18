import { useState } from 'react';
import Navbar from '../../components/Navbar';
import JobsTabs from '../../components/JobTabs';
import { Container, Grid, IconButton, Typography, useMediaQuery } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoState } from '../../redux/slices/authSlice';
import { useTheme } from '@mui/material/styles';
import FilterDrawer from '../../components/FIlterDrawer';
import FilteredJobs from '../../components/FilterdJobs';
import { useQuery } from '@tanstack/react-query';
import { baseGet } from '../../utils/apiClient';
import { setAllJobs } from '../../redux/slices/jobsSlice';

const JobsList = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const { isAuthenticated } = useSelector(getUserInfoState);

    const theme = useTheme();
    const dispatch = useDispatch();

    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    const handleToggleFilter = () => {
        setFilterOpen(!filterOpen);
    };

    const { data, isLoading, isError } = useQuery({
        queryFn: async () => await baseGet(`/v1/job/all/`),
        queryKey: ["jobs"],

    });
    if (data) {
        dispatch(setAllJobs(data))
        console.log(data, "data");
    }

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography >Something went wrong</Typography>;


    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} />
            <Container maxWidth="lg" sx={{ paddingTop: "100px" }} >
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
                        <FilteredJobs />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default JobsList;
