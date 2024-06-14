import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Grid,
} from '@mui/material';

const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
        return description.slice(0, maxLength) + '...';
    }
    return description;
};

const JobCard = ({ title, proposedBudget, datePosted, description, skills }) => {
    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                            Budget: ${proposedBudget}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary" align="right">
                            Posted: {datePosted}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 1 }}>
                    {truncateDescription(description, 40)}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {skills.map((skill, index) => (
                        <Chip key={index} label={skill} size="small" />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default JobCard;
