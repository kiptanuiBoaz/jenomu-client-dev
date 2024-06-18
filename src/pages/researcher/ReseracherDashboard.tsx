import { Box, Button, Container, Typography } from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { baseGet } from "../../utils/apiClient";

const ResearcherDashboard = () => {
    const { data, isLoading, isError } = useQuery({
        queryFn: async () => await baseGet(`/v1/job/all/`),
        queryKey: ["jobs"],

    });
    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography >Something went wrong</Typography>;
    return <Container>
        {data.map((job: any) => <Box>
            <Typography>{job.name}</Typography>
            <Typography>{job.description}</Typography>
            <Typography>{job.proposed_budget}</Typography>
            <Button variant="outlined" onClick={() => { }}>Edit</Button>
        </Box>)}
    </Container>;
};

export default ResearcherDashboard;
