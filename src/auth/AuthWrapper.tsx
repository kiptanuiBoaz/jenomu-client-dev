import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserInfoState } from '../redux/slices/authSlice';

interface AuthProps {
    role?: string;
    children?: ReactNode;
}

const AuthWrapper = ({ role, children }: AuthProps) => {
    const { user, isAuthenticated } = useSelector(getUserInfoState);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (role && user.role.id !== role) {
        return <Navigate to="/unauthorized" />;
    }

    return children ? children : <Outlet />;
};

export default AuthWrapper;
