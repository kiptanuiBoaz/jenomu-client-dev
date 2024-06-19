import { Box, Button, Container, Typography } from "@mui/material";

import { useMutation, useQuery } from "@tanstack/react-query";
import { baseDelete, baseGet, basePost } from "../../utils/apiClient";
import { getUserInfoState } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentJob } from "../../redux/slices/navigationSlice";
import { useNavigate } from "react-router-dom";
import Notiflix, { Confirm } from "notiflix";


const ResearcherDashboard = () => {
    const { user } = useSelector(getUserInfoState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
        // / v1 / job / by_creator / ${ user.user.guid } /
        queryFn: async () => await baseGet(`/v1/job/by_creator/${user.user.guid}/`),
        queryKey: ["jobs"],

    });

    console.log(user.user.guid);

    const handleDelete = async (job_guid: string) => {
        Confirm.show(
            'Delete this job ?',
            'This operation cannot be undone, and this record will be lost completely.',
            'Delete',
            'Cancel',
            () => deleteJob.mutate(job_guid),
            () => { },
            {
            },
        );
    }

    const deleteJob = useMutation({
        mutationFn: async (job_guid: string) => await baseDelete(`/v1/job/delete/${job_guid}/`),
        onSuccess: () => {
            Notiflix.Notify.success('Submitted Successfully!');
        },
        onError: () => {
            Notiflix.Notify.failure('Failed to submit feedback!');

        },
    });
    // const handleDelete()=>{
    //     try {

    //     } catch (error) {

    //     }
    // }


    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography >Something went wrong</Typography>;

    return <Container>
        {data.map((job: any) => <Box key={data.guid}>
            <Typography>{job.name}</Typography>
            <Typography>{job.description}</Typography>
            <Typography>{job.proposed_budget}</Typography>
            <Button variant="outlined" onClick={() => {
                dispatch(setCurrentJob(job.guid));
                navigate("/researcher/edit-job")
            }}>Edit</Button>
            <Button color="error" variant="outlined" onClick={() => handleDelete(job.guid)}>Delete</Button>
        </Box>)}
    </Container>;
};

export default ResearcherDashboard;
