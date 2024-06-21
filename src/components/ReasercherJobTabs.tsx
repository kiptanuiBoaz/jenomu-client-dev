import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentJob } from '../redux/slices/navigationSlice';

import NoJobFound from './NoJobFound';
import ResearcherJobCard from './ResearcherJobCard';
import { baseDelete } from '../utils/apiClient';
import { Confirm, Notify } from 'notiflix';


const ResearcherJobTabs = ({ jobs }: any) => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const handleTabChange = (_event: any, newValue: React.SetStateAction<number>) => {
        setTabIndex(newValue);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEdit = (job: { guid: any; }) => {
        dispatch(setCurrentJob(job.guid));
        navigate("/researcher/edit-job");
    };

    const handleDelete = (job_guid: string) => {

        Confirm.show(
            'Delete this job?',
            'This cannot be undone and  this record will be lost completely?',
            'Delete',
            'Cancel',
            async () => {
                try {
                    await baseDelete(`v1/job/delete/${job_guid}/`);
                    Notify.success("Job deleted successfully")
                } catch (error) {
                    Notify.failure("Error deleting")
                }
            },
            () => { },
            {
            },
        );


    };

    const filteredJobs = (status: string) => {
        return jobs.filter((job: any) => job.status === status);
    };

    const tabsContent = [
        { label: 'All', content: jobs },
        { label: 'Completed', content: filteredJobs('complete') },
        { label: 'Drafted', content: filteredJobs('draft') }
    ];
    console.log("jobs:", jobs)

    return (
        <>
            <Tabs value={tabIndex} onChange={handleTabChange}>
                {tabsContent.map((tab, index) => (
                    <Tab sx={{ textTransform: "none", paddingTop: "10px" }} key={index} label={tab.label} />
                ))}
            </Tabs>
            <Box mt={2}>
                {tabsContent[tabIndex].content.map((job: { guid: React.Key | null | undefined; }) => (
                    <ResearcherJobCard key={job.guid} job={job} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
                {tabsContent[tabIndex].content.length == 0 && <NoJobFound />}
            </Box>
        </>
    );
};

export default ResearcherJobTabs;


