import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, Typography, Button, Chip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { baseGet } from '../../utils/apiClient';
import { fToNow } from '../../utils/formatTime';
import JobApplicationModal from '../../components/JobApplicationModal';
import { useSelector } from 'react-redux';
import { getUserInfoState } from '../../redux/slices/authSlice';

const JobDetails = () => {
    const { isAuthenticated } = useSelector(getUserInfoState);
    const { jobId } = useParams<{ jobId: string }>();
    const [commentOpen, setCommentOpen] = useState(false);

    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryFn: async () => await baseGet(`/v1/job/by_guid/${jobId}/`),
        queryKey: ["job"],
    });

    if (!data) {
        return <div>Job not found</div>;
    }

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Something went wrong</Typography>;

    const handleCommentOpen = () => {
        if (isAuthenticated) {
            setCommentOpen(true);
        } else {
            navigate("/login")
        }

    };

    const handleCommentClose = () => {
        setCommentOpen(false);
    };

    if (!jobId) return <Navigate to="/" />;

    return (
        <Grid pt={"30px"} p={10} container spacing={2}>
            {/* Main Panel (70%) */}
            <Grid item xs={12} md={8}>
                <Box p={3} bgcolor="background.paper">
                    <Typography variant="h6" gutterBottom>
                        {data.name}
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textSecondary">
                                Proposed Budget: ${data.proposed_budget}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textSecondary">
                                Posted: {fToNow(data.created_at)}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                {data.job_type}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="body1" gutterBottom>
                        {data.description}
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Starting: {fToNow(data.start_date)}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textSecondary">
                                Ending: {fToNow(data.end_date)}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                {data.job_type}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="h6" color="textPrimary">
                        Skills Required
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {data.skills_required && data.skills_required.map((skill: string, index: number) => (
                            <Chip key={index} label={skill} size="medium" />
                        ))}
                    </Box>
                </Box>
            </Grid>
            {/* Side Panel (30%) */}
            <Grid item xs={12} md={4}>
                <Box p={3} bgcolor="background.paper">
                    <Typography variant="h6" gutterBottom>
                        Matching Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {data.skills_required && data.skills_required.map((skill: string, index: number) => (
                            <Chip key={index} label={skill} size="medium" />
                        ))}
                    </Box>
                    <Button
                        sx={{ marginY: 2 }}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleCommentOpen}
                    >
                        Apply Now
                    </Button>
                </Box>
            </Grid>
            <JobApplicationModal open={commentOpen} handleClose={handleCommentClose} jobId={jobId as string} />
        </Grid>
    );
};

export default JobDetails;
