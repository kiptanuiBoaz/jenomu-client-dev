import { Container, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { baseGet } from "../../utils/apiClient";
import { getUserInfoState } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import ResearcherProfile from '../../components/ResearcherProfile';
import FreelancerJobTabs from "../../components/FreelancerJobTabs";

const FreelancerDashboard = () => {
    const { user } = useSelector(getUserInfoState);

    const { data, isLoading, isError } = useQuery({
        queryFn: async () => await baseGet(`/v1/job_application/by_applicant/${user.user.guid}/`),
        queryKey: ["applications"],
    });


    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Something went wrong</Typography>;

    console.log(data)
    return (
        <Container maxWidth="lg" sx={{ paddingTop: "70px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <ResearcherProfile user={user} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <FreelancerJobTabs applications={data} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default FreelancerDashboard;
