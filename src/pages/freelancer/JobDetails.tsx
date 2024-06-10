import { useNavigate, useParams } from 'react-router-dom';

// Mock job data (same as in JobList)
const mockJobs = [
    { id: "1", title: 'Web Developer', company: 'Tech Solutions', location: 'New York, NY', description: 'Develop and maintain web applications.' },
    { id: "2", title: 'Graphic Designer', company: 'Creative Minds', location: 'San Francisco, CA', description: 'Create visual concepts to communicate ideas.' },
    { id: "3", title: 'Project Manager', company: 'Business Corp', location: 'Chicago, IL', description: 'Plan, initiate, and manage projects.' },
    // Add more mock jobs as needed
];

const JobDetails = () => {
    const { jobId } = useParams<{ jobId: string }>();
    const job = mockJobs.find(job => job.id === jobId);

    const navigate = useNavigate();

    if (!job) {
        return <div>Job not found</div>;
    }

    return (
        <div>
            <h1>{job.title}</h1>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Description:</strong> {job.description}</p>

            <button onClick={() => navigate(`/apply/${jobId}`)}>Apply job</button>
        </div>
    );
};

export default JobDetails;
