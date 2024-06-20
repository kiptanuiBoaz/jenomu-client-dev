import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UnauthorizedPage from '../pages/Unauthorized';
import JobDetails from '../pages/freelancer/JobDetails';
import AuthWrapper from '../auth/AuthWrapper';
import ApplyJob from '../pages/freelancer/ApplyJob';
import ResearcherDashboard from '../pages/researcher/ResercherDashboard';
import AdminDashboard from '../pages/admin/AdminDashborad';
import CreateAccount from '../pages/auth/CreateAccount';
import Login from '../pages/auth/Login';
import EnterCodeForm from '../pages/auth/EnterCode';
import SetNewPassword from '../pages/auth/SetNewPassword';
import ResetPasswordForm from '../pages/auth/ResetPassword';
import JobSearchResults from '../pages/freelancer/JobSearchResults';
import JobsList from '../pages/freelancer/JobsList';
import CreateJob from '../pages/researcher/CreateJob';
import EditJob from '../pages/researcher/EditJob';
import { useSelector } from 'react-redux';
import { getUserInfoState } from '../redux/slices/authSlice';
import Navbar from '../components/Navbar';

const AppRoutes = () => {
    const { isAuthenticated } = useSelector(getUserInfoState);

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} />
            <Routes>

                {/* Public Routes */}
                <Route index path="/" element={< JobsList />} />
                <Route index path="/search/jobs" element={< JobSearchResults />} />
                < Route path="/login" element={< Login />} />
                < Route path="/enter-code" element={< EnterCodeForm />} />
                < Route path="/set-new-password" element={< SetNewPassword />} />
                < Route path="/reset-password" element={< ResetPasswordForm />} />
                <Route path="/create-account" element={< CreateAccount />} />
                < Route path="/unauthorized" element={< UnauthorizedPage />} />

                {/* Freelancer Routes */}
                < Route path="/job/:jobId" element={< JobDetails />} />
                < Route path="/apply/:jobId" element={< AuthWrapper role="freelancer" > <ApplyJob /></AuthWrapper >} />

                {/* Researcher Routes */}
                <Route path="/researcher" element={< AuthWrapper role="researcher" > <ResearcherDashboard /></AuthWrapper >} />
                <Route path="/researcher/post-job" element={< AuthWrapper role="researcher" > <CreateJob /></AuthWrapper >} />
                <Route path="/researcher/edit-job" element={< AuthWrapper role="researcher" > <EditJob /></AuthWrapper >} />

                {/* Admin Routes */}
                <Route path="/admin" element={< AuthWrapper role="admin" > <AdminDashboard /></AuthWrapper >} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
