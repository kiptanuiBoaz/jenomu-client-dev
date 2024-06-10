import { useNavigate } from 'react-router-dom';

// Mock job data
const mockJobs = [
    { id: "1", title: 'Web Developer', company: 'Tech Solutions', location: 'New York, NY' },
    { id: "2", title: 'Graphic Designer', company: 'Creative Minds', location: 'San Francisco, CA' },
    { id: "3", title: 'Project Manager', company: 'Business Corp', location: 'Chicago, IL' },
    // Add more mock jobs as needed
];

const JobList = () => {
    const navigate = useNavigate();

    const handleViewDetails = (jobId: string) => {
        navigate(`/job/${jobId}`);
    };

    return (
        <div>
            <h1>Job List</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {mockJobs.map(job => (
                    <div key={job.id} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', width: '300px' }}>
                        <h2>{job.title}</h2>
                        <p>{job.company}</p>
                        <p>{job.location}</p>
                        <button onClick={() => handleViewDetails(job.id)}>View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobList;
