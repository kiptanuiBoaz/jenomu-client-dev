import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
    IconButton,
    Box,
    Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore, Menu } from '@mui/icons-material';

interface Job {
    job_guid: string;
    user_guid: string;
    comments: string;
    status: string;
    submission_date: string;
    created_by?: string;
    updated_by?: string;
    deleted_at?: string;
    deleted_by?: string;
}

const mockJobs: Job[] = [
    // Add some mock jobs data here for demonstration purposes
    {
        job_guid: '1',
        user_guid: 'user1',
        comments: 'First job',
        status: 'Open',
        submission_date: '2023-06-01',
    },
    {
        job_guid: '2',
        user_guid: 'user2',
        comments: 'Second job',
        status: 'Closed',
        submission_date: '2023-06-05',
    },
    // Add more mock jobs as needed
];

const JobSearchResults: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterOpen, setFilterOpen] = useState(false);
    const [statusFilterOpen, setStatusFilterOpen] = useState(true);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [jobs, setJobs] = useState<Job[]>(mockJobs);

    const params = Object.fromEntries([...searchParams]);
    console.log('Mounted:', params);

    useEffect(() => {
        const currentParams = Object.fromEntries([...searchParams]);
        console.log('useEffect:', currentParams);
        setSearchParams({ sort: 'name', order: 'ascending' });
    }, [searchParams, setSearchParams]);

    const handleToggleFilter = () => {
        setFilterOpen(!filterOpen);
    };

    const handleStatusFilterToggle = () => {
        setStatusFilterOpen(!statusFilterOpen);
    };

    const handleStatusChange = (status: string) => {
        const currentIndex = selectedStatuses.indexOf(status);
        const newChecked = [...selectedStatuses];

        if (currentIndex === -1) {
            newChecked.push(status);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSelectedStatuses(newChecked);
        filterJobs(newChecked);
    };

    const filterJobs = (statuses: string[]) => {
        if (statuses.length === 0) {
            setJobs(mockJobs);
        } else {
            setJobs(mockJobs.filter(job => statuses.includes(job.status)));
        }
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleToggleFilter}
                        sx={{ display: { md: 'none' } }}
                    >
                        <Menu />
                    </IconButton>
                    <Drawer
                        variant="temporary"
                        open={filterOpen}
                        onClose={handleToggleFilter}
                        ModalProps={{ keepMounted: true }}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <Box sx={{ width: 250 }}>
                            <List>
                                <ListItem button onClick={handleStatusFilterToggle}>
                                    <ListItemText primary="Status" />
                                    {statusFilterOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={statusFilterOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {['Open', 'Closed'].map((status) => (
                                            <ListItem key={status} button onClick={() => handleStatusChange(status)}>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={selectedStatuses.indexOf(status) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                    />
                                                </ListItemIcon>
                                                <ListItemText primary={status} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </List>
                        </Box>
                    </Drawer>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <List>
                            <ListItem button onClick={handleStatusFilterToggle}>
                                <ListItemText primary="Status" />
                                {statusFilterOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={statusFilterOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {['Open', 'Closed'].map((status) => (
                                        <ListItem key={status} button onClick={() => handleStatusChange(status)}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={selectedStatuses.indexOf(status) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={status} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Typography variant="h4" gutterBottom>
                        Job Search Results
                    </Typography>
                    {jobs.map(job => (
                        <Box key={job.job_guid} sx={{ marginBottom: 2 }}>
                            <Typography variant="h6">{job.comments}</Typography>
                            <Typography variant="body2">Status: {job.status}</Typography>
                            <Typography variant="body2">Submission Date: {job.submission_date}</Typography>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
};

export default JobSearchResults;
