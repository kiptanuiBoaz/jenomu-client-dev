import { Grid } from '@mui/material';
import { JobCard } from './JobCard';
import NoJobFound from './NoJobFound';


const FilteredJobs = ({ filteredJobs }: any) => {

    return (
        <Grid container spacing={1}>
            {filteredJobs.length === 0 && <NoJobFound />}
            {filteredJobs.map((job: any, index: number) => (
                <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                    <JobCard
                        title={job.name}
                        proposedBudget={job.proposed_budget}
                        datePosted={job.created_at}
                        description={job.description}
                        skills={job.skills_required}
                        id={job.guid}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default FilteredJobs;
