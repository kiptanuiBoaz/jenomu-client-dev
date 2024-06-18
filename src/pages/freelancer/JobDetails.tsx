import { useNavigate, useParams } from 'react-router-dom';
import { all_jobs } from '../../utils/data';
import { Box, Grid, Typography, Button } from '@mui/material';

const JobDetails = () => {
    const { jobId } = useParams<{ jobId: string }>();
    const job = all_jobs.find(job => job.id === jobId);

    const navigate = useNavigate();

    if (!job) {
        return <div>Job not found</div>;
    }

    return (
        <Grid container spacing={2}>
            {/* Main Panel (70%) */}
            <Grid item xs={12} md={8}>
                <Box p={3} bgcolor="background.paper">
                    <Typography variant="h4" gutterBottom>
                        {job.title}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Company:</strong> "Jenomu"
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Location:</strong> "Montreal, Canada"
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Description:</strong> {job.description}
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
