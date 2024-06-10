import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import UnauthorizedPage from '../pages/Unauthorized';
import JobList from '../pages/freelancer/JobList';
import JobDetails from '../pages/freelancer/JobDetails';
import AuthWrapper from '../auth/AuthWrapper';
import ApplyJob from '../pages/freelancer/ApplyJob';
import ResearcherDashboard from '../pages/researcher/ReseracherDashboard';
import PostJob from '../pages/researcher/PostJob';
import AdminDashboard from '../pages/admin/AdminDashborad';
import CreateAccount from '../pages/auth/CreateAccount';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route index path="/" element={< JobList />} />
                < Route path="/login" element={< Login />} />
                <Route path="/create-account" element={< CreateAccount />} />
                < Route path="/unauthorized" element={< UnauthorizedPage />} />

                {/* Freelancer Routes */}
                < Route path="/job/:jobId" element={< JobDetails />} />
                < Route path="/apply/:jobId" element={< AuthWrapper role="freelancer" > <ApplyJob /></AuthWrapper >} />

                {/* Researcher Routes */}
                <Route path="/researcher" element={< AuthWrapper role="researcher" > <ResearcherDashboard /></AuthWrapper >} />
                < Route path="/researcher/post-job" element={< AuthWrapper role="researcher" > <PostJob /></AuthWrapper >} />

                {/* Admin Routes */}
                <Route path="/admin" element={< AuthWrapper role="admin" > <AdminDashboard /></AuthWrapper >} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
