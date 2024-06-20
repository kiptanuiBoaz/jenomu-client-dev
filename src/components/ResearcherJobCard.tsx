import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, Menu, MenuItem, Tabs, Tab, Grid, CardActionArea, Stack } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentJob } from '../redux/slices/navigationSlice';
import { truncateText } from '../utils/truncateText';
import { fToNow } from '../utils/formatTime';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const ResearcherJobCard = ({ job, onEdit, onDelete }: any) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();

    const handleViewDetails = (jobId: string) => {
        navigate(`/job/${jobId}`);
    };
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>

                <Box display="flex" justifyContent="space-between">
                    <Typography color={"primary"} variant="h6" component="div" > {truncateText(job.name, 20)}</Typography>
                    <IconButton onClick={(e) => handleMenuClick(e as any)}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                        <MenuItem onClick={() => onEdit(job)}>Edit</MenuItem>
                        <MenuItem onClick={() => onDelete(job.guid)}>Delete</MenuItem>
                    </Menu>
                </Box>
                <Grid container spacing={1}>
                    <Grid item xs={5}>
                        <Typography variant="body2" color="textSecondary">
                            Budget: ${job.proposed_budget}
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="body2" color="textSecondary" align="left">
                            {fToNow(job.created_at)}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="body1" color="secondary" sx={{ mt: 1, mb: 1 }}>
                    {truncateText(job.description, 20)}
                </Typography>

            </CardContent>
            <CardActionArea sx={{ p: 2 }} onClick={() => handleViewDetails(job.guid)}   >
                <Stack sx={{ justifyContent: "space-between" }} direction={"row"}>
                    <Typography variant="body1" align="left">
                        View More
                    </Typography>
                    <TrendingFlatIcon fontSize="small" />
                </Stack>

            </CardActionArea>

        </Card>
    );
};

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

    const handleDelete = (jobGuid: any) => {
        // Delete logic here
    };

    const filteredJobs = (status: string) => {
        return jobs.filter((job: { status: any; }) => job.status === status);
    };

    const tabsContent = [
        { label: 'All', content: jobs },
        { label: 'Completed', content: filteredJobs('completed') },
        { label: 'Drafted', content: filteredJobs('drafted') }
    ];

    return (
        <>
            <Tabs value={tabIndex} onChange={handleTabChange}>
                {tabsContent.map((tab, index) => (
                    <Tab key={index} label={tab.label} />
                ))}
            </Tabs>
            <Box mt={2}>
                {tabsContent[tabIndex].content.map((job: { guid: React.Key | null | undefined; }) => (
                    <ResearcherJobCard key={job.guid} job={job} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </Box>
        </>
    );
};

export default ResearcherJobTabs;
