import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, Typography, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { baseGet } from '../../utils/apiClient';

const JobDetails = () => {
    const { jobId } = useParams<{ jobId: string }>();


    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryFn: async () => await baseGet(`/v1/job/by_guid/${jobId}/`),
        queryKey: ["job"],

    });

    if (!data) {
        return <div>Job not found</div>;
    }

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography >Something went wrong</Typography>;

    return (
        <Grid container spacing={2}>
            {/* Main Panel (70%) */}
            <Grid item xs={12} md={8}>
                <Box p={3} bgcolor="background.paper">
                    <Typography variant="h4" gutterBottom>
                        {data.title}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Company:</strong> "Jenomu"
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Location:</strong> "Montreal, Canada"
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Description:</strong> {data.description}
                    </Typography>

                </Box>
            </Grid>

            {/* Side Panel (30%) */}
            <Grid item xs={12} md={4}>
                <Box p={3} bgcolor="background.paper">
                    <Typography variant="h6" gutterBottom>
                        Matching Skills
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {/* Display matching skills here */}
                        {['Genetics', 'Molecular Biology', 'Sequencing', 'Data Analysis'].map((skill, index) => (
                            <Typography key={index} variant="body2">
                                - {skill}
                            </Typography>
                        ))}
                    </Typography>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/apply/${jobId}`)}
                    >
                        Apply Now
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default JobDetails;
