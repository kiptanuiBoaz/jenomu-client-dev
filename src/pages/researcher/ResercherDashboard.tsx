import { Container, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { baseGet } from "../../utils/apiClient";
import { getUserInfoState } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import ResearcherProfile from '../../components/ResearcherProfile';
import ResearcherJobTabs from "../../components/ResearcherJobCard";

const ResearcherDashboard = () => {
    const { user } = useSelector(getUserInfoState);

    const { data, isLoading, isError } = useQuery({
        queryFn: async () => await baseGet(`/v1/job/by_creator/${user.user.guid}/`),
        queryKey: ["jobs"],
    });


    console.log(user);

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Something went wrong</Typography>;


    return (
        <Container maxWidth="lg" sx={{ paddingTop: "50px", backgroundColor: "#f7f7f7" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <ResearcherProfile user={user} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <ResearcherJobTabs jobs={data} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ResearcherDashboard;
