import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, Typography, Button, Chip, Stack, CardActionArea } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { baseGet } from '../../utils/apiClient';
import { fToNow } from '../../utils/formatTime';
import JobApplicationModal from '../../components/JobApplicationModal';
import { useSelector } from 'react-redux';
import { getUserInfoState } from '../../redux/slices/authSlice';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';


export const JobDetails = () => {
    const { isAuthenticated, user } = useSelector(getUserInfoState);
    const { jobId } = useParams<{ jobId: string }>();
    const role_guid = user.user.role.guid

    const navigate = useNavigate();

    const [commentOpen, setCommentOpen] = useState(false);
    const [applicationsData, setApplicationsData] = useState<any>([]);

    const { data: job, isLoading: jobLoading, isError: jobError } = useQuery({
        queryFn: async () => await baseGet(`/v1/job/by_guid/${jobId}/`),
        queryKey: ["job"],
    });

    const { data: applications, isLoading: applicationLoading, isError: applicationError } = useQuery({
        queryFn: async () => await baseGet(`/v1/job_application/by_job/${jobId}/`),
        queryKey: ["application"],
    });

    useEffect(() => {
        if (applications) {
            setApplicationsData(applications);
        }
    }, [applications]);

    console.log(applicationsData)

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
    if (jobLoading || applicationLoading) return <Typography>Loading...</Typography>;
    if (jobError || applicationError) return <Typography>Something went wrong</Typography>;

    return (
        <Grid pt={"30px"} p={["2%", "7%"]} container spacing={2}>
            {/* Main Panel (70%) */}
            <Grid item xs={12} md={8}>
                <Box pt={[1, 3]} bgcolor="background.paper">
                    <Typography variant="h6" gutterBottom>
                        {job.name}
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textSecondary">
                                Proposed Budget: ${job.proposed_budget}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textSecondary">
                                Posted: {fToNow(job.created_at)}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                {job.job_type}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="body1" gutterBottom>
                        {job.description}
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Starting: {fToNow(job.start_date)}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textSecondary">
                                Ending: {fToNow(job.end_date)}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                {job.job_type}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="h6" color="textPrimary">
                        Skills Required
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {job.skills_required && job.skills_required.map((skill: string, index: number) => (
                            <Chip key={index} label={skill} size="medium" />
                        ))}
                    </Box>
                </Box>
            </Grid>
            {/* Side Panel (30%) */}
            <Grid item xs={12} md={4}>
                {role_guid === "2f4aa31b-0fd1-4099-a263-23e2571f07d2" &&
                    <Box p={3} bgcolor="background.paper">
                        <Typography variant="h6" gutterBottom>
                            Matching Skills
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {job.skills_required && job.skills_required.map((skill: string, index: number) => (
                                <Chip key={index} label={skill} size="medium" />
                            ))}
                        </Box>
                        {applicationsData.find((app: any) => app.user.guid === user.user.guid) ? (
                            <Stack>
                                <Typography variant="h6" gutterBottom>
                                    Application
                                </Typography>
                                <Typography>You have already applied</Typography>
                                <Typography color="textSecondary" variant='body2'>
                                    Status:  <Chip label={applicationsData?.find((app: any) => app.user.guid === user.user.guid)?.status} size="medium" />
                                </Typography>
                            </Stack>
                        ) : (
                            <Button
                                sx={{ marginY: 2 }}
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={handleCommentOpen}
                            >
                                Apply Now
                            </Button>
                        )}
                    </Box>
                }
                {role_guid === "fc651bc8-20c4-4814-950d-481aae85bba2" &&
                    < Box p={3} bgcolor="background.paper">
                        <Typography sx={{ paddingX: 3 }} variant="h6" gutterBottom>
                            Applicantions
                        </Typography>
                        <Box>
                            {applicationsData && applicationsData.map((app: any, index: number) => (
                                <CardActionArea onClick={() => navigate(`/researcher/application/${app.guid}`)} key={index} sx={{ gap: 0.5, paddingX: 3, paddingY: 1, borderRadius: 4 }}>
                                    <Stack sx={{}} direction={"row"} justifyContent={"space-between"}>
                                        <Stack gap={1} direction={"row"}>
                                            <Typography color="textPrimary" variant='body2'>
                                                {app.user.first_name} {"  "}{app.user.last_name}{" "}
                                            </Typography>
                                            <Typography variant='body2' color="textSecondary" >
                                                {fToNow(app.created_at)}
                                            </Typography>
                                        </Stack>

                                        <TrendingFlatIcon fontSize="small" />

                                    </Stack>
                                </CardActionArea>

                            ))}
                        </Box>
                    </Box>}
            </Grid>
            <JobApplicationModal open={commentOpen} handleClose={handleCommentClose} jobId={jobId as string} />
        </Grid>
    );
};

export default JobDetails;
