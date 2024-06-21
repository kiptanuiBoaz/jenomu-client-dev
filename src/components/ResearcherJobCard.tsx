
import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, Menu, MenuItem, Grid, CardActionArea, Stack } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
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
    console.log("checking", job);



    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>

                <Box display="flex" justifyContent="space-between">
                    <Typography color={"primary"} variant="h6" component="div" > {truncateText(job.name, 60)}</Typography>
                    <IconButton onClick={(e) => handleMenuClick(e as any)}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                        <MenuItem onClick={() => onEdit(job)}>Edit</MenuItem>
                        <MenuItem onClick={() => onDelete(job.guid)}>Delete</MenuItem>
                    </Menu>
                </Box>

                <Typography variant="body1" color="secondary" sx={{ mt: 1, mb: 1 }}>
                    {truncateText(job.description, 88)}
                </Typography>

                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Typography variant="body2" color="textSecondary">
                            Agreed Budget: ${job.agreed_budget}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body2" color="textSecondary" align="left">
                            Posted: {fToNow(job.created_at)}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body2" color="textSecondary" align="left">
                            Applications: 7
                        </Typography>
                    </Grid>
                </Grid>


                <Grid container spacing={1}>
                    <Grid item xs={4}>

                        <Typography variant="body2" color="textSecondary">
                            Status: ${job.status}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>

                        <Typography variant="body2" color="textSecondary">
                            Due: {fToNow(job.submission_date)}
                        </Typography>
                    </Grid>
                </Grid>

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


export default ResearcherJobCard;
