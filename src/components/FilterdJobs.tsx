import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { JobCard } from './JobCard';
import { RootState } from '../redux/store/store';

const FilteredJobs = () => {
    const { jobs } = useSelector((state: RootState) => state.jobs);
    console.log(jobs[0])
    return (
        <Grid container spacing={1}>
            {jobs.map((job: any, index: number) => (
                <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                    <JobCard
                        title={job.name}
                        proposedBudget={job.propposed_budget}
                        datePosted={job.date_posted}
                        description={job.description}
                        skills={job.skills}
                        id={job.id}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default FilteredJobs;
