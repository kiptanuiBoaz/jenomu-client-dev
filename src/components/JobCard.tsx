import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Grid,
    CardActionArea,
    Button,
} from '@mui/material';
import { JobCardProps } from '../types/jobs.types';
import { truncateText } from '../utils/truncateText';
import { useNavigate } from 'react-router-dom';
import { fToNow } from '../utils/formatTime';


export const JobCard = ({ title, proposedBudget, datePosted, description, skills, id }: JobCardProps) => {
    const navigate = useNavigate();

    const handleViewDetails = (jobId: string) => {
        navigate(`/job/${jobId}`);
    };

    return (
        <Card sx={{ maxWidth: 370, m: 2, p: 2 }}>
            <CardContent>
                <Typography color={"primary"} variant="h6" component="div">
                    {truncateText(title, 20)}
                </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={5}>
                        <Typography variant="body2" color="textSecondary">
                            Budget: ${proposedBudget}
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="body2" color="textSecondary" align="left">
                            {fToNow(datePosted)}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="body1" color="secondary" sx={{ mt: 1, mb: 1 }}>
                    {truncateText(description, 40)}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {skills.map((skill: string, index: number) => (
                        <Chip key={index} label={skill} size="small" />
                    ))}
                </Box>
            </CardContent>
            <CardActionArea sx={{ p: 2 }}>
                <Button onClick={() => handleViewDetails(id)} size='small' variant='outlined' >
                    View More
                </Button>
            </CardActionArea>
        </Card>
    );
};

