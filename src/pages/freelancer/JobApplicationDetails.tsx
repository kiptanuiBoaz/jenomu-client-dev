import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, Typography, Button, Chip, Stack, CardActionArea, Avatar, Rating } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { baseGet } from '../../utils/apiClient';
import { fToNow } from '../../utils/formatTime';
import JobApplicationModal from '../../components/JobApplicationModal';
import { useSelector } from 'react-redux';
import { getUserInfoState } from '../../redux/slices/authSlice';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { HOST_API_KEY } from '../../config-global';
import JobApprovalModal from '../../components/JobApprovalModal';

const JobApplicationDetails = () => {
    const { isAuthenticated, user } = useSelector(getUserInfoState);
    const { applicationId } = useParams<{ applicationId: string }>();
    const navigate = useNavigate();

    const [approveOpen, setApproveOpen] = useState(false);
    const [applicationData, setApplicationData] = useState<any>(null);

    const { data: application, isLoading: applicationLoading, isError: applicationError } = useQuery({
        queryFn: async () => await baseGet(`/v1/job_application/by_guid/${applicationId}/`),
        queryKey: ["application", applicationId],
    });

    const { data: applicantProfile, isLoading: profileLoading, isError: profileError } = useQuery({
        queryFn: async () => await baseGet(`/v1/user/by_guid/${application?.user?.guid}/`),
        queryKey: ["applicantProfile", application?.user?.guid],
        enabled: !!application?.user?.guid
    });

    useEffect(() => {
        if (application) {
            setApplicationData(application);
        }
    }, [application]);

    const handleApprovalOpen = () => {
        if (isAuthenticated) {
            setApproveOpen(true);
        } else {
            navigate("/login");
        }
    };

    const handleApprovalClose = () => {
        setApproveOpen(false);
    };

    if (!applicationId) return <Navigate to="/" />;
    if (applicationLoading || profileLoading) return <Typography>Loading...</Typography>;
    if (applicationError || profileError) return <Typography>Something went wrong</Typography>;

    const job = application?.job;
    const role_guid = user.user.role.guid;

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
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                By: {application.user.first_name}{" "}{application.user.last_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textSecondary">
                                Applied: {fToNow(application.created_at)}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2" color="textSecondary">
                                Budget: ${job.proposed_budget}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="h6" gutterBottom>
                        Applicant comment
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                        {application.comments}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Job Description
                    </Typography>
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
                                Type: {job.job_type}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Stack gap={1} direction={"row"} py={2}>
                        <Button onClick={() => navigate(-1)} sx={{ textTransform: "none" }} variant='outlined'>Back to job details</Button>
                        <Button sx={{ textTransform: "none" }} variant='contained'>Approve Application</Button>
                    </Stack>
                </Box>
            </Grid>
            {/* Side Panel (30%) */}
            <Grid item xs={12} md={4}>
                <Typography textAlign={"center"} color="primary" sx={{ paddingX: 3 }} variant="h6" gutterBottom>
                    Applicant Details
                </Typography>
                <Stack justifyItems={"center"} justifyContent={"center"} p={3} bgcolor="background.paper">
                    <Avatar
                        alt={applicantProfile?.first_name}
                        src={`${HOST_API_KEY}${applicantProfile?.profile?.image}` ?? ""}
                        sx={{ width: 100, height: 100, mb: 2, marginX: "auto" }}
                    />
                    <Typography textAlign={"center"} variant="h6">{applicantProfile?.first_name} {applicantProfile?.last_name}</Typography>
                    <Typography color="textSecondary" textAlign={"center"}>{applicantProfile?.phone_number}</Typography>
                    <Typography color="textSecondary" textAlign={"center"} variant="body2">{applicantProfile?.email}</Typography>
                    <Box

                        sx={{
                            '& > legend': { mt: 2 },
                            display: "flex",
                            justifyContent: "center",
                            justifyItems: 'center'
                        }}
                    >
                        <Rating sx={{ alignSelf: "center" }} size="small" name="read-only" value={4} readOnly />
                    </Box>
                    <Typography mt={2} textAlign={"center"} variant="h6" gutterBottom>
                        Skills
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: "center", flexWrap: 'wrap', gap: 0.5 }}>
                        {job.skills_required && job.skills_required.map((skill: string, index: number) => (
                            <Chip key={index} label={skill} size="medium" />
                        ))}
                    </Box>
                </Stack>
                {role_guid === "2f4aa31b-0fd1-4099-a263-23e2571f07d2" &&
                    <Box p={3} bgcolor="background.paper">

                        {applicationData ? (
                            <Stack>
                                <Typography variant="h6" gutterBottom>
                                    Application
                                </Typography>
                                <Typography color="textSecondary" variant='body2'>
                                    Status: <Chip label={applicationData.status} size="medium" />
                                </Typography>
                            </Stack>
                        ) : (
                            <Button
                                sx={{ marginY: 2 }}
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={handleApprovalOpen}
                            >
                                Apply Now
                            </Button>
                        )}
                    </Box>
                }
                {role_guid === "fc651bc8-20c4-4814-950d-481aae85bba2" &&
                    <Box p={3} bgcolor="background.paper">

                        <Box>
                            {applicationData && (
                                <CardActionArea sx={{ gap: 0.5, paddingX: 3, paddingY: 1, borderRadius: 4 }}>
                                    <Stack direction={"row"} justifyContent={"space-between"}>
                                        <Stack gap={1} direction={"row"}>
                                            <Typography color="textPrimary" variant='body2'>
                                                {applicationData.user.first_name} {"  "}{applicationData.user.last_name}{" "}
                                            </Typography>
                                            <Typography variant='body2' color="textSecondary" >
                                                {fToNow(applicationData.created_at)}
                                            </Typography>
                                        </Stack>
                                        <TrendingFlatIcon fontSize="small" />
                                    </Stack>
                                </CardActionArea>
                            )}
                        </Box>
                    </Box>}
            </Grid>
            <JobApprovalModal
                applicationId={application.guid}
                applicationStatus={application.status}
                open={approveOpen}
                handleClose={handleApprovalClose}
            />
        </Grid>
    );
};

export default JobApplicationDetails;
