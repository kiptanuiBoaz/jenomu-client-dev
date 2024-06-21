import React from 'react';
import { Box, Tabs, Tab, Grid, CardActionArea } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentJob } from '../redux/slices/navigationSlice';

import NoJobFound from './NoJobFound';
import FreelancerJobCard from './FreeancerJobCard';
import { Confirm, Notify } from 'notiflix';
import { baseDelete } from '../utils/apiClient';


const FreelancerJobTabs = ({ applications }: any) => {
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

    const handleDelete = (application_guid: string) => {

        Confirm.show(
            'Delete this job?',
            'This cannot be undone and  this record will be lost completely?',
            'Delete',
            'Cancel',
            async () => {
                try {
                    await baseDelete(`v1/job/delete/${application_guid}/`);
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

    const filteredApplications = (status: string) => {
        return applications.filter((a: any) => a.status === status);
    };

    const tabsContent = [
        { label: 'All', content: applications },
        { label: 'Under review', content: filteredApplications('submitted') },
        { label: 'In progress', content: filteredApplications('progress') },
        { label: 'Rejected', content: filteredApplications('rejectted') }
    ];

    return (
        <>
            <Tabs value={tabIndex} onChange={handleTabChange}>
                {tabsContent.map((tab, index) => (
                    <Tab sx={{ textTransform: "none" }} key={index} label={tab.label} />
                ))}
            </Tabs>
            <Box mt={2}>
                {tabsContent[tabIndex].content.map((app: { guid: React.Key | null | undefined; }) => (
                    <FreelancerJobCard key={app.guid} application={app} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
                {tabsContent[tabIndex].content.length == 0 && <NoJobFound />}
            </Box>
        </>
    );
};

export default FreelancerJobTabs;
